import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { parseSort } from '../../../../../utils/query.parser';
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { TipoCambioCierreService } from "../../application/services/TipoCambioCierre.service";
import { TipoCambioCierreDto } from "../../application/dto/TipoCambioCierre.dto";
import { YearMesService } from "../../../year-mes/application/services/YearMes.service";

@injectable()
export class TipoCambioCierreController extends BaseController {
    constructor(
        @inject(TipoCambioCierreService) private service: TipoCambioCierreService,
        @inject(YearMesService) private yearMesService: YearMesService
    ) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search
                ? [
                    { yearMes: { mes :{name: Like(`%${search}%`)}  } },
                    { yearMes: { year :{name: Like(`%${search}%`)}  } },
                ]
                : {};

            const defaultSortOrder: FindOptionsOrder<any> = { id: 'ASC' };
            const order = parseSort<any>(
                sort,
                ['id', 'compra', 'venta'],
                defaultSortOrder
            );

            const findOptions: FindManyOptions<any> = {
                where,
                order,
                relations: ["yearMes", "yearMes.mes", "yearMes.year"]
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
                size: all ? count : size,
                yearMeses: await this.yearMesService.listAll()
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as TipoCambioCierreDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CONTROLLER_TIPO_CAMBIO_CIERRE" : "UPDATE_TIPO_CAMBIO_CIERRE", "OPERACIÓN EXITOSA", result, userId);
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