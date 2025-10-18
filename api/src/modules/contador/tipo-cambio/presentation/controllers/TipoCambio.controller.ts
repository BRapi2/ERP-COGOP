import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Raw } from 'typeorm';
import { LogService } from "../../../../../utils/log.service";
import { TipoCambioService } from '../../application/service/TipoCambio.service';
import { TipoCambioDto } from '../../application/dto/TipoCambio.dto';
import { MonedaService } from '../../../moneda/application/services/Moneda.service';

@injectable()
export class TipoCambioController extends BaseController {
    constructor(
        @inject(TipoCambioService) private readonly tipoCambioService: TipoCambioService,
        @inject(MonedaService) private readonly monedaService: MonedaService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search
                ? { fecha: Raw(alias => `DATE(${alias}) = :date`, { date: search }) }
                : {};
            const defaultSortOrder: FindOptionsOrder<TipoCambioDto> = { id: 'ASC' };
            const order = parseSort<TipoCambioDto>(
                sort,
                ['id', 'fecha', 'tipoCambioCompra', 'tipoCambioVenta'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions = {
                where,
                order
            };
            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.tipoCambioService.list(findOptions);
            const moneda = await this.monedaService.obtenerMonedas()
            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                moneda
            };
            return this.handleSuccess(responsePayload);

        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as TipoCambioDto;
            const result = dto.id ? await this.tipoCambioService.update(dto.id, dto) : await this.tipoCambioService.create(dto);
            await LogService.logSuccess(!dto.id ? "CREATE_CUENTA_AJUSTE" : "UPDATE_CUENTA_AJUSTE", "OPERACIÓN EXITOSA", result, userId);
            return this.handleSuccess(result, !dto.id ? 201 : 200);

        } catch (error) {
            return this.handleError(error);
        }
    }
}