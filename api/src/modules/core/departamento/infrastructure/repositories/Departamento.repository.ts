import { FindManyOptions, Repository } from "typeorm";
import { IDepartamentoRepository } from "../../domain/repositories/IDepartamento.repository";
import { AppDataSource } from "../../../../../db";
import { DepartamentoEntity } from "../../domain/entities/Departamento.entity";
import { DepartamentoMapping } from "../persistence/Departamento.mapping";
import { DepartamentoModel } from "../model/Departamento.models";

export class DepartamentoRepository implements IDepartamentoRepository {
    private readonly ormRepository: Repository<DepartamentoModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(DepartamentoModel);
    }
    async findAll(): Promise<DepartamentoEntity[]> {
        const model = await this.ormRepository.find();
        return model.map(DepartamentoMapping.toEntity);
    }

    async findById(id: number): Promise<DepartamentoEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? DepartamentoMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<DepartamentoEntity | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? DepartamentoMapping.toEntity(model) : null;
    }

    async save(entity: DepartamentoEntity): Promise<DepartamentoEntity> {
        const model = DepartamentoMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return DepartamentoMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<DepartamentoEntity>): Promise<[DepartamentoEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(DepartamentoMapping.toEntity);
        return [entities, count];
    }
}