import { FindManyOptions, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { parseSort } from "../../../../../utils/query.parser";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { LogService } from "../../../../../utils/log.service";
import { ReportesTipoEncargadoService } from "../../application/services/ReportesTipoEncargado.service";
import { ReportesTipoEncargadoDto } from "../../application/dto/ReportesTipoEncargado.dto";

@injectable()
export class ReportesTipoEncargadoController extends BaseController {
    constructor(
        @inject(ReportesTipoEncargadoService) private service: ReportesTipoEncargadoService
    ) {
        super();
    }

    public async list(query: ListQueryDto): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort } = query;

            const defaultSortOrder: FindOptionsOrder<ReportesTipoEncargadoDto> = { id: "ASC" };
            const order = parseSort<ReportesTipoEncargadoDto>(
                sort,
                ["id"],
                defaultSortOrder
            );

            const findOptions: FindManyOptions<ReportesTipoEncargadoDto> = { order };
            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.service.list(findOptions);

            return this.handleSuccess({
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as ReportesTipoEncargadoDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                dto.id ? "ACTUALIZAR_REPORTE_TIPO_ENCARGADO" : "CREAR_REPORTE_TIPO_ENCARGADO",
                "Operación exitosa",
                result,
                userId
            );

            return this.handleSuccess(result, dto.id ? 200 : 201);
        } catch (error) {
            if (error instanceof ConflictError) return this.handleError(error, 409);
            if (error instanceof NotFoundError) return this.handleError(error, 404);
            return this.handleError(error);
        }
    }
}
