import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { MonedaDto } from '../../application/dto/Moneda.dto';
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, Like, FindOptionsOrder } from 'typeorm';
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { MonedaService } from '../../application/services/Moneda.service';

@injectable()
export class MonedaController extends BaseController {

    constructor(@inject(MonedaService) private service: MonedaService) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {

            const { page, size, all, sort, search } = query;
            const where = search ? [
                { codigoMoneda: Like(`%${search}%`) },
                { nombreMoneda: Like(`%${search}%`) }
            ] : {};
            const defaultSortOrder: FindOptionsOrder<MonedaDto> = { id: 'ASC' };
            const order = parseSort<MonedaDto>(
                sort,
                ['id', 'codigoMoneda', 'nombreMoneda'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<MonedaDto> = { where, order };

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
                size: all ? count : size
            };
            return this.handleSuccess(responsePayload);

        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as MonedaDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREATE_MONEDA" : "UPDATE_MONEDA", "OPERACIÓN EXITOSA", result, userId);
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