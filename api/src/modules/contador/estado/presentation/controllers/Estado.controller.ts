import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { EstadoService } from "../../application/services/Estado.service";
import { EstadoDto } from "../../application/dto/Estado.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from "../../../../../utils/query.parser";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { LogService } from "../../../../../utils/log.service";

@injectable()
export class EstadoController extends BaseController {
    constructor(
        @inject(EstadoService) private service: EstadoService
    ) { super(); }

    public async list(query: ListQueryDto): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search ? { nombre: Like(`%${search}%`) } : {};
            
            const defaultSortOrder: FindOptionsOrder<EstadoDto> = { nombre: 'ASC' };
            const order = parseSort<EstadoDto>(sort, ['id', 'nombre'], defaultSortOrder);
            
            const findOptions: FindManyOptions<EstadoDto> = { 
                where, 
                order 
            };

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
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as EstadoDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREAR_ESTADO" : "ACTUALIZAR_ESTADO", "Operación exitosa", result);
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

    public async delete(req: HttpRequest): Promise<HttpResponseInit> {
        try {
            const id = parseInt(req.params.id);
            await this.service.delete(id);
            return this.handleSuccess(null, 204);
        } catch (error) {
            if (error instanceof NotFoundError) {
                return this.handleError(error, 404);
            }
            return this.handleError(error);
        }
    }
}