import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { ReportesPeriodoEntity } from "../../domain/entities/reportes-periodo.entity";
import { ReportesPeriodoDto } from "../dto/ReportesPeriodo.dto";
import { IReportesPeriodoRepository } from "../../domain/repositories/IReportesPeriodo.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class ReportesPeriodoService {
    constructor(
        @inject('IReportesPeriodoRepository') private repository: IReportesPeriodoRepository
    ) { }

    public findAll(): Promise<ReportesPeriodoEntity[]> {
        return this.repository.findAll();
    }

    public async list(options: FindManyOptions<ReportesPeriodoEntity>): Promise<[ReportesPeriodoEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async getById(id: number): Promise<ReportesPeriodoEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Reporte con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: ReportesPeriodoDto): Promise<ReportesPeriodoEntity> {
        await this.validateDto(dto);
        await this.validateUniqueNombre(dto.nombre);

        const newEntity = ReportesPeriodoEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesPeriodoDto): Promise<ReportesPeriodoEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);

        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }

        const updatedEntity = ReportesPeriodoEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ReportesPeriodoDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un reporte con el nombre '${nombre}'`);
        }
    }
}
