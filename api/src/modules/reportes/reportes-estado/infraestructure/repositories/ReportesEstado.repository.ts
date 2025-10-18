import { FindManyOptions, Repository } from "typeorm";
import { IReportesEstadoRepository } from "../../domain/repositories/IReportesEstado.repository";
import { AppDataSource } from "../../../../../db";
import { ReportesEstadoEntity } from "../../domain/entities/reportes-estado.entity";
import { ReportesEstadoMapping } from "../persistence/reportes-estado.mapping";
import { ReportesEstadoModel } from "../model/reportes-estado.models";

export class ReportesEstadoRepository implements IReportesEstadoRepository {
    private readonly ormRepository: Repository<ReportesEstadoModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(ReportesEstadoModel);
    }

    async findAll(): Promise<ReportesEstadoEntity[]> {
        const models = await this.ormRepository.find();
        return models.map(ReportesEstadoMapping.toEntity);
    }

    async findById(id: number): Promise<ReportesEstadoEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? ReportesEstadoMapping.toEntity(model) : null;
    }

    async findByNombre(nombre: string): Promise<ReportesEstadoEntity | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? ReportesEstadoMapping.toEntity(model) : null;
    }

    async save(entity: ReportesEstadoEntity): Promise<ReportesEstadoEntity> {
        const model = ReportesEstadoMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return ReportesEstadoMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<ReportesEstadoEntity>): Promise<[ReportesEstadoEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options as any);
        const entities = models.map(ReportesEstadoMapping.toEntity);
        return [entities, count];
    }
}
