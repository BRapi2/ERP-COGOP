import { injectable, inject } from "tsyringe";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from "../../../../../utils/query.parser";
import { FindManyOptions, FindOptionsOrder, Like } from "typeorm";
import { CuentaContableService } from "../../application/services/CuentaContable.service";
import { CuentaContableDto } from "../../application/dto/CuentaContable.dto";
import { CuentaContable } from "../../domain/entities/CuentaContable.entity";
import { LogService } from "../../../../../utils/log.service";

@injectable()
export class CuentaContableController extends BaseController {
    constructor(
        @inject(CuentaContableService) private readonly service: CuentaContableService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId?: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where: any = search ? { nombreCuenta: Like(`%${search}%`) } : {};

            const defaultSortOrder: FindOptionsOrder<CuentaContable> = { id: "ASC" };
            const order = parseSort<CuentaContable>(sort, ["id", "codigoCuenta", "nombreCuenta"], defaultSortOrder);

            const findOptions: FindManyOptions<CuentaContable> = { where, order };

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

    public async save(req: HttpRequest, userId?: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as CuentaContableDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREAR_CUENTA_CONTABLE" : "ACTUALIZAR_CUENTA_CONTABLE", "OPERACION EXITOSA", result);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }
}