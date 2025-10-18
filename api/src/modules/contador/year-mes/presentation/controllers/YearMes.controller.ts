import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { parseSort } from '../../../../../utils/query.parser';
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { YearMesService } from "../../application/services/YearMes.service";
import { YearMesDto } from "../../application/dto/YearMes.dto";
import { YearService } from "../../../year/application/services/year.service";
import { MesService } from "../../../mes/application/services/mes.service";

@injectable()
export class YearMesController extends BaseController {
    constructor(
        @inject(YearMesService) private service: YearMesService,
        @inject(YearService) private serviceYear: YearService,
        @inject(MesService) private serviceMes: MesService,
    ) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search
                ? [
                    { mes: { name: Like(`%${search}%`) } },
                    { year: { name: Like(`%${search}%`) } }
                ]
                : {};
            const defaultSortOrder: FindOptionsOrder<YearMesDto> = { id: 'ASC' };
            const order = parseSort<YearMesDto>(
                sort,
                ['id'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<YearMesDto> = { where, order };
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
                year: await this.serviceYear.findAll(),
                mes: await this.serviceMes.findAll()
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }
    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            console.log("ANTES DE .......")
            console.log(req)
            const dto = req.validatedBody as YearMesDto;
            console.log("DESPUES DE .......")
            console.log(dto)
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CONTROLLER_YEAR_MES" : "UPDATE_YEAR_MES", "OPERACIÓN EXITOSA", result, userId);
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
