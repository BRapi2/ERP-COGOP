import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { ReportesPeriodoDescripcionService } from "../../application/services/ReportesPeriodoDescripcion.service";
import { ReportesPeriodoService } from "../../../reportes-periodo/application/services/ReportesPeriodo.service";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { parseSort } from "../../../../../utils/query.parser";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { LogService } from "../../../../../utils/log.service";
import { ReportesPeriodoDescripcionDto } from "../../application/dto/ReportesPeriodoDescripcion.dto";

@injectable()
export class ReportesPeriodoDescripcionController extends BaseController {

    constructor(
        @inject(ReportesPeriodoDescripcionService) private service: ReportesPeriodoDescripcionService,
        @inject(ReportesPeriodoService) private periodoService: ReportesPeriodoService
    ) { super(); }

    public async list(query: ListQueryDto): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;

            const where = search
                ? { nombre: Like(`%${search}%`) }
                : {};

            const defaultSortOrder: FindOptionsOrder<ReportesPeriodoDescripcionDto> = { id: 'ASC' };
            const order = parseSort<ReportesPeriodoDescripcionDto>(
                sort,
                ['id', 'nombre'],
                defaultSortOrder
            );

            const findOptions: FindManyOptions<ReportesPeriodoDescripcionDto> = { where, order };
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
                size: all ? count : size,
                periodos: await this.periodoService.findAll()
            });

        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as ReportesPeriodoDescripcionDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                dto.id ? "ACTUALIZAR_REPORTE_PERIODO_DESC" : "CREAR_REPORTE_PERIODO_DESC",
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
