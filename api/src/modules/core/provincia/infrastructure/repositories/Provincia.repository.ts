import { FindManyOptions, Repository } from "typeorm";
import { IProvinciaRepository } from "../../domain/repositories/IProvincia.repository";
import { ProvinciaModel } from "../model/Provincia.model";
import { AppDataSource } from "../../../../../db";
import { ProvinciaEntity } from "../../domain/entities/Provincia.entity";
import { ProvinciaMapping } from "../persistence/Provincia.mapping";

export class ProvinciaRepository implements IProvinciaRepository {
    private readonly ormRepository: Repository<ProvinciaModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ProvinciaModel);
    }
    async findAll(): Promise<ProvinciaEntity[]> {
        const model = await this.ormRepository.find({
            relations: { departamento: true }
        });
        return model.map(ProvinciaMapping.toEntity);
    }


    async findById(id: number): Promise<ProvinciaEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: ['departamento']
        });
        return model ? ProvinciaMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<ProvinciaEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { nombre },
            relations: ['departamento']
        });
        return model ? ProvinciaMapping.toEntity(model) : null;
    }

    async save(entity: ProvinciaEntity): Promise<ProvinciaEntity> {
        const model = ProvinciaMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return ProvinciaMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<ProvinciaEntity>): Promise<[ProvinciaEntity[], number]> {
        const modelOptions: FindManyOptions<ProvinciaModel> = { ...options, relations: ['departamento'] };
        const [models, count] = await this.ormRepository.findAndCount(modelOptions);
        const entities = models.map(ProvinciaMapping.toEntity);
        return [entities, count];
    }
}