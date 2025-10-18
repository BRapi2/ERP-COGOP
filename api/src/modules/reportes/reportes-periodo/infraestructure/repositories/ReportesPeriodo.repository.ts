import { FindManyOptions, Repository } from "typeorm";
import { IReportesPeriodoRepository } from "../../domain/repositories/IReportesPeriodo.repository";
import { AppDataSource } from "../../../../../db";
import { ReportesPeriodoEntity } from "../../domain/entities/reportes-periodo.entity";
import { ReportesPeriodoMapping } from "../persistence/reportes-periodo.mapping";
import { ReportesPeriodoModel } from "../model/reportes-periodo.models";

export class ReportesPeriodoRepository implements IReportesPeriodoRepository {
    private readonly ormRepository: Repository<ReportesPeriodoModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesPeriodoModel);
    }

    async findAll(): Promise<ReportesPeriodoEntity[]> {
        const models = await this.ormRepository.find();
        return models.map(ReportesPeriodoMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesPeriodoEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? ReportesPeriodoMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<ReportesPeriodoEntity | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? ReportesPeriodoMapping.toEntity(model) : null;
    }

    async save(entity: ReportesPeriodoEntity): Promise<ReportesPeriodoEntity> {
        const model = ReportesPeriodoMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return ReportesPeriodoMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<ReportesPeriodoEntity>): Promise<[ReportesPeriodoEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(ReportesPeriodoMapping.toEntity);
        return [entities, count];
    }
}
