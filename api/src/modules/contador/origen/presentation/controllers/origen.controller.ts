import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Like } from 'typeorm';
import { LogService } from "../../../../../utils/log.service";
import { OrigenDto } from '../../application/dto/origen.dto';
import { Origen } from '../../domain/entities/origen.entity';
import { ConflictError, NotFoundError } from '../../../../../errors/custom.errors';
import { OrigenService } from '../../application/services/origen.service';

@injectable()
export class OrigenController extends BaseController {
    constructor(
        @inject(OrigenService) private readonly origenService: OrigenService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            console.log("CONTROLLER NUEVO")
            const { page, size, all, sort, search } = query;
            const where: any[] = [];
            if (search) {
                where.push({ codigo: Like(`%${search}%`) });
                where.push({ nombre: Like(`%${search}%`) });
            }

            const defaultSortOrder: FindOptionsOrder<Origen> = { id: 'ASC' };
            const order = parseSort<Origen>(sort, ['id', 'codigo', 'nombre'], defaultSortOrder);

            const findOptions: FindManyOptions<Origen> = {
                ...(where.length > 0 && { where }),
                order
            };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.origenService.list(findOptions);
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
            console.log("CONTROLLER NUEVO")
            const dto = req.validatedBody as OrigenDto;
            const result = dto.id
                ? await this.origenService.update(dto.id, dto)
                : await this.origenService.create(dto);
            await LogService.logSuccess(dto.id ? "UPDATE_ORIGEN" : "CREATE_ORIGEN", "OPERACIÓN EXITOSA", result, userId);
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