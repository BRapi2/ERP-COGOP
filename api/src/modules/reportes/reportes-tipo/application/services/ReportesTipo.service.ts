import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { ReportesTipoEntity } from "../../domain/entities/reportes-tipo.entity";
import { ReportesTipoDto } from "../dto/ReportesTipo.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IReportesTipoRepository } from "../../domain/repositories/IReportesTipo.repository";

@injectable()
export class ReportesTipoService {
    constructor(
        @inject('IReportesTipoRepository') private repository: IReportesTipoRepository
    ) { }

    public async list(options: FindManyOptions<ReportesTipoEntity>): Promise<[ReportesTipoEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<ReportesTipoEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<ReportesTipoEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`ReportesTipo con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: ReportesTipoDto): Promise<ReportesTipoEntity> {
        await this.validateDto(dto);
        await this.validateUniqueNombre(dto.nombre);

        const entity = ReportesTipoEntity.crear(dto);
        return this.repository.save(entity);
    }

    public async update(id: number, dto: ReportesTipoDto): Promise<ReportesTipoEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);

        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }

        const updatedEntity = ReportesTipoEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ReportesTipoDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un tipo de reporte con el nombre '${nombre}'`);
        }
    }
}
