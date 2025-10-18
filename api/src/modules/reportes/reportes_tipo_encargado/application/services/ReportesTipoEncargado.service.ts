import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IReportesTipoEncargadoRepository } from "../../domain/repositories/IReportesTipoEncargado.repository";
import { ReportesTipoEncargadoEntity } from "../../domain/entities/reportes-tipo-encargado.entity";
import { ReportesTipoEncargadoDto } from "../dto/ReportesTipoEncargado.dto";

@injectable()
export class ReportesTipoEncargadoService {
    constructor(
        @inject("IReportesTipoEncargadoRepository") private repository: IReportesTipoEncargadoRepository
    ) { }

    public async list(options: FindManyOptions<ReportesTipoEncargadoEntity>): Promise<[ReportesTipoEncargadoEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<ReportesTipoEncargadoEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<ReportesTipoEncargadoEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Encargado con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: ReportesTipoEncargadoDto): Promise<ReportesTipoEncargadoEntity> {
        await this.validateDto(dto);
        const newEntity = ReportesTipoEncargadoEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: ReportesTipoEncargadoDto): Promise<ReportesTipoEncargadoEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        const updated = ReportesTipoEncargadoEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updated);
    }

    private async validateDto(dto: ReportesTipoEncargadoDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const messages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${messages.join(", ")}`);
        }
    }
}
