import { FindManyOptions, Like, FindOptionsOrder } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { parseSort } from '../../../../../utils/query.parser';
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { IglesiaService } from "../../application/services/Iglesia.service";
import { IglesiaDto } from "../../application/dto/Iglesia.dto";
import { DistritoService } from "../../../distrito/application/services/Distrito.service";
import { EstadoService } from "../../../estado/application/services/Estado.service";

@injectable()
export class IglesiaController extends BaseController {
    constructor(
        @inject(IglesiaService) private service: IglesiaService,
        @inject(DistritoService) private distritoService: DistritoService,
        @inject(EstadoService) private estadoService: EstadoService,
    ) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;

            const where = search
                ? [
                    { nombre: Like(`%${search}%`) },
                    { nombre_corto: Like(`%${search}%`) }
                ]
                : {};

            const defaultSortOrder: FindOptionsOrder<IglesiaDto> = { id: 'ASC' };
            const order = parseSort<IglesiaDto>(
                sort,
                ['id'],
                defaultSortOrder
            );

            const findOptions: FindManyOptions<IglesiaDto> = { where, order };

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
                distrito: await this.distritoService.findAll(),
                estado: await this.estadoService.findAll(),
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            console.log("🚀 Antes de procesar Iglesia...");
            console.log(req);
            const dto = req.validatedBody as IglesiaDto;
            console.log("✅ DTO recibido:");
            console.log(dto);

            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                !dto.id ? "CONTROLLER_IGLESIA_CREATE" : "CONTROLLER_IGLESIA_UPDATE",
                "Operación exitosa",
                result,
                userId
            );

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
