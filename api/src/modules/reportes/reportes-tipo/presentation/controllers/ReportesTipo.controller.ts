import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { ReportesTipoService } from "../../application/services/ReportesTipo.service";
import { ReportesPeriodoService } from "../../../reportes-periodo/application/services/ReportesPeriodo.service";
import { ReportesTipoDto } from "../../application/dto/ReportesTipo.dto";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { parseSort } from "../../../../../utils/query.parser";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { LogService } from "../../../../../utils/log.service";

@injectable()
export class ReportesTipoController extends BaseController {

    constructor(
        @inject(ReportesTipoService) private service: ReportesTipoService,
        @inject(ReportesPeriodoService) private periodoService: ReportesPeriodoService
    ) {
        super();
    }

    public async list(query: ListQueryDto): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search
                ? { nombre: Like(`%${search}%`) }
                : {};
            const defaultSortOrder: FindOptionsOrder<ReportesTipoDto> = { id: 'ASC' };
            const order = parseSort<ReportesTipoDto>(sort, ['id', 'nombre'], defaultSortOrder);
            const findOptions: FindManyOptions<ReportesTipoDto> = { where, order };
            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.service.list(findOptions);

            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                periodos: await this.periodoService.findAll()
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as ReportesTipoDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREAR_REPORTE_TIPO" : "ACTUALIZAR_REPORTE_TIPO", "Operación exitosa", result, userId);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            if (error instanceof ConflictError) return this.handleError(error, 409);
            if (error instanceof NotFoundError) return this.handleError(error, 404);
            return this.handleError(error);
        }
    }
}
