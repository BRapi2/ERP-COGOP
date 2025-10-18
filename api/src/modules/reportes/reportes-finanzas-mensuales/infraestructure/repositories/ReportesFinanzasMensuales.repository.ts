import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../../../db";
import { FinanzasMensualesMapping } from "../persistence/finanzas-mensuales.mapping";
import { IReportesFinanzasMensualesRepository } from "../../domain/repositories/IReportesFinanzasMensuales.repository";
import { FinanzasMensualesEntity } from "../../domain/entities/finanzas-mensuales.entity";
import { FinanzasMensualesModel } from "../model/finanzas-mensuales.models";

export class ReportesFinanzasMensualesRepository implements IReportesFinanzasMensualesRepository {
    private readonly ormRepository: Repository<FinanzasMensualesModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(FinanzasMensualesModel);
    }

    async findAll(): Promise<FinanzasMensualesEntity[]> {
        const find = await this.ormRepository.find({});
        return find.map(FinanzasMensualesMapping.toEntity);
    }

    async findById(id: number): Promise<FinanzasMensualesEntity | null> {
        const model = await this.ormRepository.findOne({ where: { id } });
        return model ? FinanzasMensualesMapping.toEntity(model) : null;
    }

    async save(reporte: FinanzasMensualesEntity): Promise<FinanzasMensualesEntity> {
        const model = FinanzasMensualesMapping.toModel(reporte);
        try {
            const savedModel = await this.ormRepository.save(model);
            return FinanzasMensualesMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }

    async findAndCount(options?: FindManyOptions<FinanzasMensualesModel>): Promise<[FinanzasMensualesEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({ ...options });
        const entities = models.map(FinanzasMensualesMapping.toEntity);
        return [entities, count];
    }
}
