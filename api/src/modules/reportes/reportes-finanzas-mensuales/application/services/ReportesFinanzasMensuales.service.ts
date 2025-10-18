import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { IReportesFinanzasMensualesRepository } from "../../domain/repositories/IReportesFinanzasMensuales.repository";
import { FinanzasMensualesEntity } from "../../domain/entities/finanzas-mensuales.entity";
import { ReportesFinanzasMensualesDto } from "../dto/ReportesFinanzasMensuales.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { FinanzasMensualesModel } from "../../infraestructure/model/finanzas-mensuales.models";

@injectable()
export class ReportesFinanzasMensualesService {
    constructor(
        @inject('IReportesFinanzasMensualesRepository') private repository: IReportesFinanzasMensualesRepository,
    ) { }

    public async list(options: FindManyOptions<FinanzasMensualesModel>): Promise<[FinanzasMensualesEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<FinanzasMensualesEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<FinanzasMensualesEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Reporte Finanzas Mensuales con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: ReportesFinanzasMensualesDto): Promise<FinanzasMensualesEntity> {
        // normalize fecha: accept string or Date
        if (dto.fecha && typeof dto.fecha === 'string') {
            dto.fecha = new Date(dto.fecha) as any;
        }
        await this.validateDto(dto);
        const newEntity = FinanzasMensualesEntity.crear(dto as any);
        return await this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesFinanzasMensualesDto): Promise<FinanzasMensualesEntity> {
        // normalize fecha: accept string or Date
        if (dto.fecha && typeof dto.fecha === 'string') {
            dto.fecha = new Date(dto.fecha) as any;
        }
        await this.validateDto(dto);
        const existing = await this.getById(id);
        const updatedEntity = FinanzasMensualesEntity.crear({ ...existing, ...dto, id });
        return await this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ReportesFinanzasMensualesDto): Promise<void> {
        const errors = await validate(dto as any);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inv\u00e1lidos: ${errorMessages.join(', ')}`);
        }
    }
}
