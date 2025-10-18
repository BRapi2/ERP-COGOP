import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IReportesPeriodoDescripcionRepository } from "../../domain/repositories/IReportesPeriodoDescripcion.repository";
import { ReportesPeriodoDescripcionEntity } from "../../domain/entities/reportes-periodo-descripcion.entity";
import { ReportesPeriodoDescripcionDto } from "../dto/ReportesPeriodoDescripcion.dto";

@injectable()
export class ReportesPeriodoDescripcionService {
    constructor(
        @inject('IReportesPeriodoDescripcionRepository') private repository: IReportesPeriodoDescripcionRepository
    ) { }

    public async list(options: FindManyOptions<ReportesPeriodoDescripcionEntity>): Promise<[ReportesPeriodoDescripcionEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<ReportesPeriodoDescripcionEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<ReportesPeriodoDescripcionEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Descripción con ID ${id} no encontrada`);
        }
        return entity;
    }

    public async create(dto: ReportesPeriodoDescripcionDto): Promise<ReportesPeriodoDescripcionEntity> {
        await this.validateDto(dto);
        const newEntity = ReportesPeriodoDescripcionEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesPeriodoDescripcionDto): Promise<ReportesPeriodoDescripcionEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        const updated = ReportesPeriodoDescripcionEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updated);
    }

    private async validateDto(dto: ReportesPeriodoDescripcionDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${messages.join(', ')}`);
        }
    }
}
