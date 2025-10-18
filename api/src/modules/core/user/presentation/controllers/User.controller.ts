import { FindManyOptions, FindOptionsOrder, Like } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { UserService } from "../../application/services/User.service";
import { UserDto } from "../../application/dto/User.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from "../../../../../utils/query.parser";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

// Servicios relacionados
import { PerfilService } from "../../../perfil/application/services/Perfil.service";
import { RolService } from "../../../rol/application/services/Rol.service";
import { EstadoService } from "../../../estado/application/services/Estado.service";
import { IglesiaService } from "../../../iglesia/application/services/Iglesia.service";
import { UserEntity } from "../../domain/entities/User.entity";

@injectable()
export class UserController extends BaseController {
    constructor(
        @inject(UserService) private service: UserService,
        @inject(PerfilService) private perfilService: PerfilService,
        @inject(RolService) private rolService: RolService,
        @inject(EstadoService) private estadoService: EstadoService,
        @inject(IglesiaService) private iglesiaService: IglesiaService,
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;

            const defaultSort: FindOptionsOrder<UserEntity> = { username: 'ASC' };
            const order = parseSort<UserEntity>(
                sort,
                [
                    'id', 'username', 'ministerio', 'mision',
                ],
                defaultSort
            );

            const options: FindManyOptions<UserEntity> = {
                order,
                ...(all ? {} : { take: size, skip: page * size })
            };

            const [list, count] = await this.service.searchAndCount(search || "", options);

            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                perfil: await this.perfilService.findAll(),
                rol: await this.rolService.findAll(),
                estado: await this.estadoService.findAll(),
                iglesia: await this.iglesiaService.listAll(),
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }


    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as UserDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);

            await LogService.logSuccess(
                dto.id ? "UPDATE_USUARIO" : "CREATE_USUARIO",
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

    public async delete(req: HttpRequest): Promise<HttpResponseInit> {
        try {
            const id = parseInt(req.params.id);
            await this.service.delete(id);
            return this.handleSuccess(null, 204);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async findById(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const usuario = await this.service.getById(userId);
            if (!usuario?.rol) {
                return this.handleError(new Error("Usuario o rol no encontrado"));
            }

            return this.handleSuccess({ rol: usuario.rol.id });
        } catch (error) {
            return this.handleError(error);
        }
    }
}
