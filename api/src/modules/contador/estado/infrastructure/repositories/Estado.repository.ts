import { FindManyOptions, Repository } from "typeorm";
import { EstadoMapping } from "../persistence/Estado.mapping";
import { IEstadoRepository } from "../../domain/repositories/IEstado.repository";
import { EstadoModel } from "../model/estado.models";
import { EstadoEntity } from "../../domain/entities/Estado.entity";
import { AppDataSource2 } from "../../../../../db";

export class EstadoRepository implements IEstadoRepository {
    private readonly ormRepository: Repository<EstadoModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(EstadoModel);
    }

    async findAll(): Promise<EstadoEntity[]> {
        const models = await this.ormRepository.find();
        return models.map(EstadoMapping.toEntity);
    }

    async findById(id: number): Promise<EstadoEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? EstadoMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<EstadoEntity | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? EstadoMapping.toEntity(model) : null;
    }

    async save(entity: EstadoEntity): Promise<EstadoEntity> {
        const model = EstadoMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return EstadoMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<EstadoEntity>): Promise<[EstadoEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(EstadoMapping.toEntity);
        return [entities, count];
    }

    async delete(id: number): Promise<void> {
        await this.ormRepository.delete(id);
    }
}