import { FindManyOptions, Repository } from "typeorm";
import { IUserRepository } from "../../domain/repositories/IUser.repository";
import { AppDataSource } from "../../../../../db";
import { UsuarioModel } from "../model/User.models";
import { UserEntity } from "../../domain/entities/User.entity";
import { UserMapping } from "../persistence/User.mapping";

export class UserRepository implements IUserRepository {
    private readonly ormRepository: Repository<UsuarioModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(UsuarioModel);
    }

    private readonly relaciones: string[] = [
        "rol",
        "estado",
        "iglesia",
    ];

    async findAll(): Promise<UserEntity[]> {
        const models = await this.ormRepository.find({
            relations: this.relaciones
        });
        return models.map(UserMapping.toEntity);
    }

    async findById(id: number): Promise<UserEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: this.relaciones
        });
        return model ? UserMapping.toEntity(model) : null;
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { username },
            relations: this.relaciones
        });
        return model ? UserMapping.toEntity(model) : null;
    }

    async save(user: UserEntity): Promise<UserEntity> {
        const model = UserMapping.toModel(user);
        const savedModel = await this.ormRepository.save(model);
        const loadedModel = await this.ormRepository.findOne({
            where: { id: savedModel.id },
            relations: this.relaciones
        });
        return loadedModel ? UserMapping.toEntity(loadedModel) : UserMapping.toEntity(savedModel);
    }

    async findAndCount(options?: FindManyOptions<UsuarioModel>): Promise<[UserEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...(options ?? {}),
            relations: this.relaciones
        });
        const entities = models.map(UserMapping.toEntity);
        return [entities, count];
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async searchUsers(
        search: string,
        options?: { skip?: number; take?: number; order?: { [key: string]: "ASC" | "DESC" } }
    ): Promise<[UserEntity[], number]> {
        const qb = this.ormRepository.createQueryBuilder("usuario")
            .leftJoinAndSelect("usuario.rol", "rol")
            .leftJoinAndSelect("usuario.estado", "estado")
            .leftJoinAndSelect("usuario.iglesia", "iglesia")

        // Si hay valor de búsqueda, aplicar filtros
        if (search && search.trim() !== "") {
            qb.where(`
            usuario.username LIKE :search
            OR usuario.ministerio LIKE :search
            OR usuario.mision LIKE :search
        `, { search: `%${search}%` });
        }

        // Ordenamiento flexible, mapeando nombres de columnas "frontend friendly" a SQL real
        const orderByMap: Record<string, string> = {
            id: "usuario.id",
            username: "usuario.username",
            ministerio: "usuario.ministerio",
            mision: "usuario.mision",
        };

        if (options?.order) {
            for (const [key, direction] of Object.entries(options.order)) {
                const column = orderByMap[key] || `usuario.${key}`;
                qb.addOrderBy(column, direction);
            }
        } else {
            qb.addOrderBy("usuario.username", "ASC");
        }

        // Paginación
        if (options?.skip !== undefined) qb.skip(options.skip);
        if (options?.take !== undefined) qb.take(options.take);

        // Ejecutar
        const [results, total] = await qb.getManyAndCount();
        return [results.map(UserMapping.toEntity), total];
    }
}
