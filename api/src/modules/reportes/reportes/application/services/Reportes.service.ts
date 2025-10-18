import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { IReportesRepository } from "../../domain/repositories/IReportes.repository";
import { ReportesEntity } from "../../domain/entities/reportes.entity";
import { ReportesDto } from "../dto/Reportes.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ReportesModel } from "../../infraestructure/model/reportes.models";
import { AppDataSource } from "../../../../../db";
import { ReportesMesPlantadorModel } from "../../../reportes-mes-plantador/infraestructure/model/reportes-mes-plantador.models";
@injectable()
export class ReportesService {
    constructor(
        @inject("IReportesRepository") private repository: IReportesRepository,
    ) { }

    // ✅ Listados no hidratan datos dinámicos
    public async list(options: FindManyOptions<ReportesModel>): Promise<[ReportesEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<ReportesEntity[]> {
        return await this.repository.findAll();
    }

    public async listByIglesiaId(
        iglesiaId: number,
        options?: FindManyOptions<ReportesModel>,
    ): Promise<[ReportesEntity[], number]> {
        return await this.repository.findByIglesiaIdWithFilters(iglesiaId, options);
    }

    // ✅ Solo getById hidrata la relación dinámica
    public async getById(id: number): Promise<ReportesEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new NotFoundError(`Reporte con ID ${id} no encontrado`);
        return await this.hydrateDynamicData(entity);
    }

    public async create(dto: ReportesDto): Promise<ReportesEntity> {
        await this.validateDto(dto);

        let dataId: number | undefined = undefined;

        const dynamicTypeMap: Record<number, any> = {
            6: ReportesMesPlantadorModel,
        };

        const modelClass = dynamicTypeMap[dto.reportesTipo?.id];

        if (modelClass) {
            const repo = AppDataSource.getRepository(modelClass);
            const detalle = repo.create({});
            const savedDetalle = await repo.save(detalle);
            dataId = savedDetalle.id;
        }

        const newEntity = ReportesEntity.crear({
            ...dto,
            data: dataId,
        });

        return await this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesDto): Promise<ReportesEntity> {
        await this.validateDto(dto);

        const existing = await this.repository.findById(id);
        if (!existing) throw new NotFoundError(`Reporte con ID ${id} no encontrado`);

        // 🔹 Map dinámico: tipo de reporte -> modelo hijo + propiedad DTO a usar
        const dynamicTypeMap: Record<
            number,
            { model: any; dtoKey: keyof ReportesDto }
        > = {
            6: { model: ReportesMesPlantadorModel, dtoKey: "reportesMesPlantador" },
            // otros tipos: 7: { model: OtroModelo, dtoKey: 'otroDto' }, etc.
        };

        const dynamicConfig = dynamicTypeMap[dto.reportesTipo?.id];

        if (dynamicConfig && existing.data) {
            const repo = AppDataSource.getRepository(dynamicConfig.model);
            const detalle = await repo.findOne({ where: { id: existing.data } });

            if (detalle) {
                Object.assign(detalle, dto[dynamicConfig.dtoKey] ?? {});
                await repo.save(detalle);
            }
        }

        const updatedEntity = ReportesEntity.crear({
            ...existing,
            ...dto,
            id,
            data: existing.data,
        });

        return await this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ReportesDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(", ")}`);
        }
    }

    private async hydrateDynamicData(entity: ReportesEntity): Promise<ReportesEntity> {
        if (!entity) return entity;

        const typeRepoMap: Record<number, any> = {
            6: ReportesMesPlantadorModel,
        };

        const repoModel = entity.reportesTipo?.id ? typeRepoMap[entity.reportesTipo.id] : null;

        if (repoModel && entity.data) {
            const repo = AppDataSource.getRepository(repoModel);
            const detalle = await repo.findOne({ where: { id: entity.data } });

            return ReportesEntity.conExtra(entity, detalle ?? undefined);
        }

        return entity;
    }

}
