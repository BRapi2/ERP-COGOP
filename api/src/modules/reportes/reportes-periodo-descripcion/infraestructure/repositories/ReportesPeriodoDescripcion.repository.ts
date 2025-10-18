import { FindManyOptions, Repository } from "typeorm";
import { IReportesPeriodoDescripcionRepository } from "../../domain/repositories/IReportesPeriodoDescripcion.repository";
import { ReportesPeriodoDescripcionModel } from "../model/reportes-periodo-descripcion.models";
import { ReportesPeriodoDescripcionMapping } from "../persistence/reportes-periodo-descripcion.mapping";
import { ReportesPeriodoDescripcionEntity } from "../../domain/entities/reportes-periodo-descripcion.entity";
import { AppDataSource } from "../../../../../db";

export class ReportesPeriodoDescripcionRepository implements IReportesPeriodoDescripcionRepository {
    private readonly ormRepository: Repository<ReportesPeriodoDescripcionModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesPeriodoDescripcionModel);
    }

    async findAll(): Promise<ReportesPeriodoDescripcionEntity[]> {
        const find = await this.ormRepository.find({ relations: ['periodo'] });
        return find.map(ReportesPeriodoDescripcionMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesPeriodoDescripcionEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: ['periodo']
        });
        return model ? ReportesPeriodoDescripcionMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<ReportesPeriodoDescripcionEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { nombre },
            relations: ['periodo']
        });
        return model ? ReportesPeriodoDescripcionMapping.toEntity(model) : null;
    }

    async save(entity: ReportesPeriodoDescripcionEntity): Promise<ReportesPeriodoDescripcionEntity> {
        const model = ReportesPeriodoDescripcionMapping.toModel(entity);
        const saved = await this.ormRepository.save(model);
        return ReportesPeriodoDescripcionMapping.toEntity(saved);
    }

    async findAndCount(options: FindManyOptions<ReportesPeriodoDescripcionEntity>): Promise<[ReportesPeriodoDescripcionEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            relations: ['periodo']
        });
        return [models.map(ReportesPeriodoDescripcionMapping.toEntity), count];
    }
}
