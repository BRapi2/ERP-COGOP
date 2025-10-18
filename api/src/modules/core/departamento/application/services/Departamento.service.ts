import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { DepartamentoEntity } from "../../domain/entities/Departamento.entity";
import { DepartamentoDto } from "../dto/Departamento.dto";
import { IDepartamentoRepository } from "../../domain/repositories/IDepartamento.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class DepartamentoService {
    constructor(
        @inject('IDepartamentoRepository') private repository: IDepartamentoRepository
    ) { }

    public findAll(): Promise<DepartamentoEntity[]> {
        return this.repository.findAll();
    }

    public async list(options: FindManyOptions<DepartamentoEntity>): Promise<[DepartamentoEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async getById(id: number): Promise<DepartamentoEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Departamento con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: DepartamentoDto): Promise<DepartamentoEntity> {
        await this.validateDto(dto);
        await this.validateUniqueNombre(dto.nombre);
        const newEntity = DepartamentoEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: DepartamentoDto): Promise<DepartamentoEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        
        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }

        const updatedEntity = DepartamentoEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: DepartamentoDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un departamento con el nombre '${nombre}'`);
        }
    }
}
