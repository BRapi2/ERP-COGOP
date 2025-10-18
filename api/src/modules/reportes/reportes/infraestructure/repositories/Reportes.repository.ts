import { FindManyOptions, Not, Repository } from "typeorm";
import { AppDataSource } from "../../../../../db";
import { ReportesModel } from "../model/reportes.models";
import { ReportesMapping } from "../persistence/reportes.mapping";
import { IReportesRepository } from "../../domain/repositories/IReportes.repository";
import { ReportesEntity } from "../../domain/entities/reportes.entity";

export class ReportesRepository implements IReportesRepository {
    private readonly ormRepository: Repository<ReportesModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesModel);
    }

    /**
     * Relaciones base comunes a cualquier tipo de reporte
     */
    private readonly relacionesBase: string[] = [
        "reportesTipo",
        "reportesPeriodoDescripcion",
        "reportesEstado",
        "iglesia",
    ];

    private getRelaciones(): string[] {
        return [
            ...this.relacionesBase,
            "reportesTipo.periodo",
            "reportesTipo.reportesTipoEncargado",
            "reportesPeriodoDescripcion.periodo",
            "iglesia.distrito",
        ];
    }


    async findAll(): Promise<ReportesEntity[]> {
        const find = await this.ormRepository.find({
            relations: this.getRelaciones(),
        });
        return find.map(ReportesMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: this.getRelaciones(), // solo las relaciones base y necesarias
        });
        return model ? ReportesMapping.toEntity(model) : null;
    }

    async findDuplicate(dynamicRelationKey: string, dynamicRelationId?: number, excludeId?: number): Promise<ReportesEntity | null> {
        if (!dynamicRelationKey || !dynamicRelationId) return null;

        const where: any = {
            [dynamicRelationKey]: { id: dynamicRelationId },
        };

        if (excludeId) {
            where.id = Not(excludeId);
        }

        const model = await this.ormRepository.findOne({
            where,
            relations: this.getRelaciones(),
        });
        return model ? ReportesMapping.toEntity(model) : null;
    }

    async save(reporte: ReportesEntity): Promise<ReportesEntity> {
        const model = ReportesMapping.toModel(reporte);
        try {
            const savedModel = await this.ormRepository.save(model);
            return ReportesMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }

    async findAndCount(options?: FindManyOptions<ReportesModel>): Promise<[ReportesEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            relations: this.getRelaciones(),
        });
        const entities = models.map(ReportesMapping.toEntity);
        return [entities, count];
    }

    public async findByIglesiaId(iglesiaId: number): Promise<ReportesEntity[]> {
        const find = await this.ormRepository.find({
            where: {
                iglesia: { id: iglesiaId },
            },
            relations: this.getRelaciones(),
        });
        return find.map(ReportesMapping.toEntity);
    }

    async findByIglesiaIdWithFilters(
        iglesiaId: number,
        options?: FindManyOptions<ReportesModel>
    ): Promise<[ReportesEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            where: {
                iglesia: { id: iglesiaId },
                ...options?.where,
            },
            relations: this.getRelaciones(),
        });

        return [models.map(ReportesMapping.toEntity), count];
    }
}
