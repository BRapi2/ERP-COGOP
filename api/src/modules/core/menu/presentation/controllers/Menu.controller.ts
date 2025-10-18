import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from '../../../../../controllers/base.controller';
import { ListQueryDto } from '../../../../../dtos/listQuery.dto';
import { MenuDto } from '../../application/dto/Menu.dto';
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, Like, FindOptionsOrder } from 'typeorm';
import { LogService } from '../../../../../utils/log.service';
import { ConflictError, NotFoundError } from '../../../../../errors/custom.errors';
import { MenuService } from '../../application/services/Menu.service';
import { RolModel } from '../../../rol/infraestructure/model/rol.models';

@injectable()
export class MenuController extends BaseController {
    constructor(@inject(MenuService) private service: MenuService) {
        super();
    }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search ? { nombre: Like(`%${search}%`) } : {};
            const defaultSortOrder: FindOptionsOrder<MenuDto> = { id: 'ASC' };
            const order = parseSort<MenuDto>(
                sort,
                ['id', 'nombre', 'order', 'url'],
                defaultSortOrder
            );

            const findOptions: FindManyOptions<MenuDto> = {
                where,
                order,
                relations: { rol: true, parent: true }
            };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.service.list(findOptions);
            const roles = await RolModel.find({ order: { nombre: 'ASC' } });

            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                roles
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as MenuDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);

            await LogService.logSuccess(!dto.id ? "CREATE_MENU" : "UPDATE_MENU", "OPERACIÓN EXITOSA", result, userId);

            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            if (error instanceof ConflictError) return this.handleError(error, 409);
            if (error instanceof NotFoundError) return this.handleError(error, 404);
            return this.handleError(error);
        }
    }
}
