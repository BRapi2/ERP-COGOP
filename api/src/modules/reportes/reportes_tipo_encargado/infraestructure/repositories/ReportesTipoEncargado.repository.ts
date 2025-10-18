import { FindManyOptions, Repository } from "typeorm";
import { IReportesTipoEncargadoRepository } from "../../domain/repositories/IReportesTipoEncargado.repository";
import { ReportesTipoEncargadoMapping } from "../persistence/reportes-tipo-encargado.mapping";
import { ReportesTipoEncargadoEntity } from "../../domain/entities/reportes-tipo-encargado.entity";
import { AppDataSource } from "../../../../../db";
import { ReportesTipoEncargadoModel } from "../model/reportes-tipo-encargado.models";

export class ReportesTipoEncargadoRepository implements IReportesTipoEncargadoRepository {
    private readonly ormRepository: Repository<ReportesTipoEncargadoModel>;

    private readonly relations: string[] = ["reportesTipo", "iglesia", "miembro"];

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesTipoEncargadoModel);
    }

    async findAll(): Promise<ReportesTipoEncargadoEntity[]> {
        const models = await this.ormRepository.find({ relations: this.relations });
        return models.map(ReportesTipoEncargadoMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesTipoEncargadoEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: this.relations
        });
        return model ? ReportesTipoEncargadoMapping.toEntity(model) : null;
    }

    async save(entity: ReportesTipoEncargadoEntity): Promise<ReportesTipoEncargadoEntity> {
        const model = ReportesTipoEncargadoMapping.toModel(entity);
        const saved = await this.ormRepository.save(model);
        return ReportesTipoEncargadoMapping.toEntity(saved);
    }

    async findAndCount(options: FindManyOptions<ReportesTipoEncargadoEntity>): Promise<[ReportesTipoEncargadoEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            relations: this.relations
        });
        return [models.map(ReportesTipoEncargadoMapping.toEntity), count];
    }
}
