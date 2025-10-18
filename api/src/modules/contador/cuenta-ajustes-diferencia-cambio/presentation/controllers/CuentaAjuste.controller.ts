import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { CuentaAjusteDto } from '../../application/dto/CuentaAjuste.dto';
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, Like, FindOptionsOrder } from 'typeorm';
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { CuentaAjusteService } from '../../application/services/CuentaAjuste.service';
import { YearService } from '../../../year/application/services/year.service';

@injectable()
export class CuentaAjusteController extends BaseController {
    constructor(@inject(CuentaAjusteService) private service: CuentaAjusteService, @inject(YearService) private serviceYear: YearService) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search ? { nombre: Like(`%${search}%`) } : {};
            const defaultSortOrder: FindOptionsOrder<CuentaAjusteDto> = { id: 'ASC' };
            const order = parseSort<CuentaAjusteDto>(
                sort,
                ['id', 'nombre', 'valor'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<CuentaAjusteDto> = {
                where,
                order,
                relations: { year: true }
            };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }
            const [list, count] = await this.service.list(findOptions);
            const years = await this.serviceYear.findAll();
            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                years
            };
            return this.handleSuccess(responsePayload);

        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as CuentaAjusteDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREATE_CUENTA_AJUSTE" : "UPDATE_CUENTA_AJUSTE", "OPERACIÓN EXITOSA", result, userId);
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