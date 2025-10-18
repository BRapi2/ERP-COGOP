import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { DepartamentoService } from "../../application/services/Departamento.service";
import { DepartamentoDto } from "../../application/dto/Departamento.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from "../../../../../utils/query.parser";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class DepartamentoController extends BaseController {
    constructor(
        @inject(DepartamentoService) private service: DepartamentoService
    ) { super(); }

    public async list(query: ListQueryDto): Promise<HttpResponseInit> {
        try {
            const [list, count] = await this.service.list({
                where: query.search ? { nombre: Like(`%${query.search}%`) } : {},
                order: parseSort<any>(query.sort, ['id', 'nombre'], { nombre: 'ASC' }),
                take: query.all ? undefined : query.size,
                skip: query.all ? undefined : query.page * query.size
            });

            return this.handleSuccess({
                content: list,
                totalElements: count,
                totalPages: query.all ? 1 : Math.ceil(count / query.size),
                number: query.page,
                size: query.all ? count : query.size
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, id): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as DepartamentoDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREAR_DEPARTAMENTO" : "ACTUALIZAR_DEPARTAMENTO", "Operación exitosa", result, id);
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