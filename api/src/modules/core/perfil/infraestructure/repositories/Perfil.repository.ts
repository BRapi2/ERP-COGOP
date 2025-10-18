import { FindManyOptions, Repository } from "typeorm";
import { IPerfilRepository } from "../../domain/repositories/IPerfil.repository";
import { AppDataSource } from "../../../../../db";
import { PerfilEntity } from "../../domain/entities/perfil.entity";
import { PerfilMapping } from "../persistence/perfil.mapping";
import { PerfilModel } from "../model/perfil.models";

export class PerfilRepository implements IPerfilRepository {
    private readonly ormRepository: Repository<PerfilModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(PerfilModel);
    }

    async findAll(): Promise<PerfilEntity[]> {
        const models = await this.ormRepository.find();
        return models.map(PerfilMapping.toEntity);
    }

    async findById(id: number): Promise<PerfilEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? PerfilMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<PerfilEntity | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? PerfilMapping.toEntity(model) : null;
    }

    async save(entity: PerfilEntity): Promise<PerfilEntity> {
        const model = PerfilMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return PerfilMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<PerfilEntity>): Promise<[PerfilEntity[], number]> {
        // TypeORM espera opciones basadas en el modelo, no en la entidad.
        const [models, count] = await this.ormRepository.findAndCount(options as FindManyOptions<PerfilModel>);
        const entities = models.map(PerfilMapping.toEntity);
        return [entities, count];
    }
}