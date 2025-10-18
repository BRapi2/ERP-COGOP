import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../../../db";
import { ReportesMesPlantadorMapping } from "../persistence/reportes-mes-plantador.mapping";
import { IReportesMesPlantadorRepository } from "../../domain/repositories/IReportesMesPlantador.repository";
import { ReportesMesPlantadorEntity } from "../../domain/entities/reportes-mes-plantador.entity";
import { ReportesMesPlantadorModel } from "../model/reportes-mes-plantador.models";

export class ReportesMesPlantadorRepository implements IReportesMesPlantadorRepository {
    private readonly ormRepository: Repository<ReportesMesPlantadorModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesMesPlantadorModel);
    }

    async findAll(): Promise<ReportesMesPlantadorEntity[]> {
        const find = await this.ormRepository.find({
        });
        return find.map(ReportesMesPlantadorMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesMesPlantadorEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
        });
        return model ? ReportesMesPlantadorMapping.toEntity(model) : null;
    }

    async save(reporte: ReportesMesPlantadorEntity): Promise<ReportesMesPlantadorEntity> {
        const model = ReportesMesPlantadorMapping.toModel(reporte);
        try {
            const savedModel = await this.ormRepository.save(model);
            return ReportesMesPlantadorMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }

    async findAndCount(options?: FindManyOptions<ReportesMesPlantadorModel>): Promise<[ReportesMesPlantadorEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
        });
        const entities = models.map(ReportesMesPlantadorMapping.toEntity);
        return [entities, count];
    }
}
