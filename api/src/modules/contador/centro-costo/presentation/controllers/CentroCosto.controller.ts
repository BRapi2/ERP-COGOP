import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { CentroCostoDto } from "../../application/dto/CentroCosto.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { CentroCostoService } from "../../application/services/CentroCosto.service";
import { BaseController } from "../../../../../controllers/base.controller";

@injectable()
export class CentroCostoController extends BaseController {
    constructor(@inject(CentroCostoService) private service: CentroCostoService) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search
                ? [
                    { nombre: Like(`%${search}%`) },
                    { codigo: Like(`%${search}%`) }
                ]
                : {};
            const defaultSortOrder: FindOptionsOrder<CentroCostoDto> = { id: 'ASC' };
            const order = parseSort<CentroCostoDto>(
                sort,
                ['id', 'codigo', 'nombre', 'activo'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<CentroCostoDto> = { where, order };
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
    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as CentroCostoDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREATE_CENTRO_COSTO" : "UPDATE_CENTRO_COSTO", "OPERACIÓN EXITOSA", result, userId);
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
