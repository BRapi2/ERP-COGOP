import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { TipoComprobanteService } from "../../application/services/TipoComprobante.service";
import { BaseController } from "../../../../../controllers/base.controller";
import { TipoComprobanteDto } from "../../application/dto/TipoComprobante.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { injectable, inject } from "tsyringe";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { LogService } from "../../../../../utils/log.service";

@injectable()
export class TipoComprobanteController extends BaseController {
    constructor(@inject(TipoComprobanteService) private service: TipoComprobanteService) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where: FindManyOptions<TipoComprobanteDto>['where'] = search ? { nombre: Like(`%${search}%`) } : {};
            const defaultSortOrder: FindOptionsOrder<TipoComprobanteDto> = { id: 'ASC' };
            const order = parseSort<TipoComprobanteDto>(
                sort,
                ['id', 'nombre'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<TipoComprobanteDto> = { where, order };
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
            const dto = req.validatedBody as TipoComprobanteDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREATE_TIPO_COMPROBANTE" : "UPDATE_TIPO_COMPROBANTE", "OPERACIÓN EXITOSA", result, userId);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }
}
