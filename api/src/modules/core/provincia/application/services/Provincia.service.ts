import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { ProvinciaEntity } from "../../domain/entities/Provincia.entity";
import { ProvinciaDto } from "../dto/Provincia.dto";
import { IProvinciaRepository } from "../../domain/repositories/IProvincia.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IDepartamentoRepository } from "../../../departamento/domain/repositories/IDepartamento.repository";

@injectable()
export class ProvinciaService {
    constructor(
        @inject('IProvinciaRepository') private repository: IProvinciaRepository,
        @inject('IDepartamentoRepository') private departamentoRepository: IDepartamentoRepository
    ) { }
    public findAll(): Promise<ProvinciaEntity[]> {
        return this.repository.findAll();
    }
    public async list(options: FindManyOptions<ProvinciaEntity>): Promise<[ProvinciaEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async getById(id: number): Promise<ProvinciaEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Provincia con ID ${id} no encontrada`);
        }
        return entity;
    }

    public async create(dto: ProvinciaDto): Promise<ProvinciaEntity> {
        await this.validateDto(dto);
        await this.validateUniqueNombre(dto.nombre);
        await this.validateDepartamentoExists(dto.departamento.id);
        
        const newEntity = ProvinciaEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: ProvinciaDto): Promise<ProvinciaEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        
        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }

        if (dto.departamento.id !== existing.departamento.id) {
            await this.validateDepartamentoExists(dto.departamento.id);
        }

        const updatedEntity = ProvinciaEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ProvinciaDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe una provincia con el nombre '${nombre}'`);
        }
    }

    private async validateDepartamentoExists(departamentoId: number): Promise<void> {
        const departamento = await this.departamentoRepository.findById(departamentoId);
        if (!departamento) {
            throw new NotFoundError(`Departamento con ID ${departamentoId} no encontrado`);
        }
    }
}