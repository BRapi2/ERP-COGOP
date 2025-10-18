import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { RolDto } from '../../application/dto/Rol.dto';
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, Like, FindOptionsOrder } from 'typeorm';
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { RolService } from '../../application/services/Rol.service';

@injectable()
export class RolController extends BaseController {
    constructor(@inject(RolService) private service: RolService) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search ? { nombre: Like(`%${search}%`) } : {};
            const defaultSortOrder: FindOptionsOrder<RolDto> = { id: 'ASC' };
            const order = parseSort<RolDto>(
                sort,
                ['id', 'nombre', 'descripcion'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<RolDto> = {
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
                size: all ? count : size
            };

            return this.handleSuccess(responsePayload);

        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as RolDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                !dto.id ? "CREATE_ROL" : "UPDATE_ROL",
                "OPERACIÓN EXITOSA",
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
