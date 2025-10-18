import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { IYearMesRepository } from "../../domain/repositories/IYearMes.repository";
import { validate } from "class-validator";
import { YearMesEntity } from "../../domain/entities/YearMes.entity";
import { YearMesDto } from "../dto/YearMes.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class YearMesService {
    constructor(
        @inject('IYearMesRepository') private repository: IYearMesRepository
    ) { }

    public async list(options: FindManyOptions<YearMesEntity>): Promise<[YearMesEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<YearMesEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<YearMesEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`YearMes con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: YearMesDto): Promise<YearMesEntity> {
        await this.validateDto(dto);
        await this.validateUniqueConstraints(dto);
        const newEntity = YearMesEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: YearMesDto): Promise<YearMesEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        await this.validateUniqueConstraints(dto, id);
        const updatedEntity = YearMesEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: YearMesDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueConstraints(
        dto: YearMesDto,
        excludeId?: number
    ): Promise<void> {
        if (!dto.mes?.id || !dto.year?.id) {
            throw new ConflictError('Faltan IDs de mes o año');
        }
        const duplicate = await this.repository.findDuplicate(
            dto.year.id,
            dto.mes.id,
            excludeId
        );
        if (duplicate) {
            throw new ConflictError(
                `Ya existe una combinación para el año ${dto.year.id} y mes ${dto.mes.id}`
            );
        }
    }
}