import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Like } from 'typeorm';
import { LogService } from "../../../../../utils/log.service";
import { YearService } from '../../application/services/year.service';
import { YearDto } from '../../application/dto/year.dto';
import { Year } from '../../domain/entities/year.entity';

@injectable()
export class YearController extends BaseController {
    constructor(
        @inject(YearService) private readonly yearService: YearService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId?: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where: any = search ? { name: Like(`%${search}%`) } : {};

            const defaultSortOrder: FindOptionsOrder<Year> = { id: 'ASC' };
            const order = parseSort<Year>(sort, ['id', 'name'], defaultSortOrder);

            const findOptions: FindManyOptions<Year> = {
                where,
                order
            };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.yearService.list(findOptions);
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
            const dto = req.validatedBody as YearDto;
            const result = dto.id
                ? await this.yearService.update(dto.id, dto)
                : await this.yearService.create(dto);
            await LogService.logSuccess(dto.id ? "UPDATE_YEAR" : "CREATE_YEAR", "OPERACIÓN EXITOSA", result, userId);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }


}
