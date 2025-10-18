import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Like } from 'typeorm';
import { MesService } from '../../application/services/mes.service';
import { MesDto } from '../../application/dto/mes.dto';
import { Mes } from '../../domain/entities/mes.entity';
import { LogService } from '../../../../../utils/log.service';

@injectable()
export class MesController extends BaseController {
    constructor(
        @inject(MesService) private readonly mesService: MesService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId?: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where: any = search ? { name: Like(`%${search}%`) } : {};

            const defaultSortOrder: FindOptionsOrder<Mes> = { id: 'ASC' };
            const order = parseSort<Mes>(sort, ['id', 'name'], defaultSortOrder);

            const findOptions: FindManyOptions<Mes> = { where, order };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.mesService.list(findOptions);
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

    public async save(req: HttpRequest, userId?: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as MesDto;
            const result = dto.id
                ? await this.mesService.update(dto.id, dto)
                : await this.mesService.create(dto);
            await LogService.logSuccess(!dto.id ? "CREAR_MES" : "ACTUALIZAR_MES", "OPERACION EXITOSA", result);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }
}
