import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { ReportesEstadoEntity } from "../../domain/entities/reportes-estado.entity";
import { ReportesEstadoDto } from "../dto/ReportesEstado.dto";
import { IReportesEstadoRepository } from "../../domain/repositories/IReportesEstado.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class ReportesEstadoService {
    constructor(
        @inject('IReportesEstadoRepository') private repository: IReportesEstadoRepository
    ) { }

    public findAll(): Promise<ReportesEstadoEntity[]> {
        return this.repository.findAll();
    }

    public async list(options: FindManyOptions<ReportesEstadoEntity>): Promise<[ReportesEstadoEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async getById(id: number): Promise<ReportesEstadoEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Estado con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: ReportesEstadoDto): Promise<ReportesEstadoEntity> {
        await this.validateDto(dto);
        await this.validateUniqueNombre(dto.nombre);

        const newEntity = ReportesEstadoEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesEstadoDto): Promise<ReportesEstadoEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);

        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }

        const updatedEntity = ReportesEstadoEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ReportesEstadoDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un estado con el nombre '${nombre}'`);
        }
    }
}
