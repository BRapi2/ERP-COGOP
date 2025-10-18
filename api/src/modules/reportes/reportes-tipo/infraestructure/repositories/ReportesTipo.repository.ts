import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../../../db";
import { ReportesTipoModel } from "../model/reportes-tipo.models";
import { ReportesTipoEntity } from "../../domain/entities/reportes-tipo.entity";
import { ReportesTipoMapping } from "../persistence/reportes-tipo.mapping";
import { IReportesTipoRepository } from "../../domain/repositories/IReportesTipo.repository";

export class ReportesTipoRepository implements IReportesTipoRepository {
    private readonly ormRepository: Repository<ReportesTipoModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesTipoModel);
    }

    async findAll(): Promise<ReportesTipoEntity[]> {
        const models = await this.ormRepository.find({
            relations: [
                'periodo',
                'reportesTipoEncargado',
                'reportesTipoEncargado.iglesia',
            ],
        });
        return models.map(ReportesTipoMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesTipoEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: [
                'periodo',
                'reportesTipoEncargado',
                'reportesTipoEncargado.iglesia',
            ],
        });
        return model ? ReportesTipoMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<ReportesTipoEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { nombre },
            relations: [
                'periodo',
                'reportesTipoEncargado',
                'reportesTipoEncargado.iglesia',
            ],
        });
        return model ? ReportesTipoMapping.toEntity(model) : null;
    }

    async save(entity: ReportesTipoEntity): Promise<ReportesTipoEntity> {
        const model = ReportesTipoMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return ReportesTipoMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<ReportesTipoEntity>): Promise<[ReportesTipoEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            relations: [
                'periodo',
                'reportesTipoEncargado',
                'reportesTipoEncargado.iglesia',
            ],
        });
        const entities = models.map(ReportesTipoMapping.toEntity);
        return [entities, count];
    }
}
