import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { TipoCambioCierreDto } from "../dto/TipoCambioCierre.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IYearMesRepository } from "../../../year-mes/domain/repositories/IYearMes.repository";
import { TipoCambioCierreEntity } from "../../domain/entities/TipoCambioCierre.entity";
import { ITipoCambioCierreRepository } from "../../domain/repositories/ITipoCambioCierre.repository";

@injectable()
export class TipoCambioCierreService {
    constructor(
        @inject('ITipoCambioCierreRepository') private repository: ITipoCambioCierreRepository,
        @inject('IYearMesRepository') private yearMesRepository: IYearMesRepository
    ) { }

    public async list(options: FindManyOptions<TipoCambioCierreEntity>): Promise<[TipoCambioCierreEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async create(dto: TipoCambioCierreDto): Promise<TipoCambioCierreEntity> {
        await this.validateDto(dto);
        await this.validateUniqueConstraints(dto);

        const yearMes = await this.yearMesRepository.findById(dto.yearMes.id);
        if (!yearMes) {
            throw new NotFoundError(`El Tipo de cambio con ID ${dto.yearMes.id} no existe`);
        }

        const newEntity = TipoCambioCierreEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: TipoCambioCierreDto): Promise<TipoCambioCierreEntity> {
        await this.validateDto(dto);
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundError(`Tipo de cambio con ID ${id} no encontrado`);
        }
        await this.validateUniqueConstraints(dto, id);
        const yearMes = await this.yearMesRepository.findById(dto.yearMes.id);
        if (!yearMes) {
            throw new NotFoundError(`El Tipo cambio con ID ${dto.yearMes.id} no existe`);
        }
        const updatedEntity = TipoCambioCierreEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: TipoCambioCierreDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueConstraints(
        dto: TipoCambioCierreDto,
        excludeId?: number
    ): Promise<void> {
        const existing = await this.repository.findByYearMesId(dto.yearMes.id);
        if (existing && (excludeId === undefined || existing.id !== excludeId)) {
            throw new ConflictError(
                `Ya existe un tipo de cambio para el año-mes con ID ${dto.yearMes.id}`
            );
        }
    }
}