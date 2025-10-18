import { FindManyOptions, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { parseSort } from "../../../../../utils/query.parser";
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { BaseController } from "../../../../../controllers/base.controller";
import { ReportesFinanzasMensualesService } from "../../application/services/ReportesFinanzasMensuales.service";
import { ReportesFinanzasMensualesDto } from "../../application/dto/ReportesFinanzasMensuales.dto";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { FinanzasMensualesModel } from "../../infraestructure/model/finanzas-mensuales.models";

@injectable()
export class ReportesFinanzasMensualesController extends BaseController {
    constructor(
        @inject(ReportesFinanzasMensualesService) private service: ReportesFinanzasMensualesService,
    ) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page = 0, size = 10, all, sort } = query;

            const defaultSort: FindOptionsOrder<FinanzasMensualesModel> = { id: "ASC" } as any;
            const order = parseSort<FinanzasMensualesModel>(sort, ["id"], defaultSort);

            const findOptions: FindManyOptions<FinanzasMensualesModel> = { order };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [reportes, count] = await this.service.list(findOptions);

            const responsePayload = {
                content: reportes,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async listById(id: number): Promise<HttpResponseInit> {
        try {
            const reporte = await this.service.getById(id);
            if (!reporte) {
                return this.handleError(new Error(`Reporte Finanzas Mensuales con id ${id} no encontrado.`), 404);
            }
            return this.handleSuccess({ content: reporte });
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as ReportesFinanzasMensualesDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                !dto.id ? "CREAR_REPORTE_FINANZAS_MENSUALES" : "ACTUALIZAR_REPORTE_FINANZAS_MENSUALES",
                "Operaci\u00f3n exitosa",
                result,
                userId
            );

            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            if (error instanceof ConflictError) {
                return this.handleError(error, 409);
            }
            if (error instanceof NotFoundError) {
                return this.handleError(error, 404);
            }
            return this.handleError(error);
        }
    }
}
