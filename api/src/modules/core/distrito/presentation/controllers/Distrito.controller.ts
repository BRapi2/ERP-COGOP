import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { DistritoService } from "../../application/services/Distrito.service";
import { DistritoDto } from "../../application/dto/Distrito.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from "../../../../../utils/query.parser";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ProvinciaService } from "../../../provincia/application/services/Provincia.service";

@injectable()
export class DistritoController extends BaseController {
    constructor(
        @inject(DistritoService) private service: DistritoService,
        @inject(ProvinciaService) private servicePro: ProvinciaService
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
                size: query.all ? count : query.size,
                provincia: await this.servicePro.findAll()
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as DistritoDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                dto.id ? "ACTUALIZAR_DISTRITO" : "CREAR_DISTRITO",
                "Operación exitosa",
                result,
                userId
            );

            return this.handleSuccess(result, dto.id ? 200 : 201);
        } catch (error) {
            if (error instanceof ConflictError) return this.handleError(error, 409);
            if (error instanceof NotFoundError) return this.handleError(error, 404);
            return this.handleError(error);
        }
    }
}