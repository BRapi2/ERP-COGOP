import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { DistritoEntity } from "../../domain/entities/Distrito.entity";
import { DistritoDto } from "../dto/Distrito.dto";
import { IDistritoRepository } from "../../domain/repositories/IDistrito.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IProvinciaRepository } from "../../../provincia/domain/repositories/IProvincia.repository";

@injectable()
export class DistritoService {
    constructor(
        @inject('IDistritoRepository') private repository: IDistritoRepository,
        @inject('IProvinciaRepository') private provinciaRepository: IProvinciaRepository
    ) { }
    public findAll(): Promise<DistritoEntity[]> {
        return this.repository.findAll();
    }
    public async list(options: FindManyOptions<DistritoEntity>): Promise<[DistritoEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async getById(id: number): Promise<DistritoEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Distrito con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: DistritoDto): Promise<DistritoEntity> {
        await this.validateDto(dto);
        await this.validateUniqueNombre(dto.nombre);
        await this.validateProvinciaExists(dto.provincia.id);
        const newEntity = DistritoEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: DistritoDto): Promise<DistritoEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }
        if (dto.provincia.id !== existing.provincia.id) {
            await this.validateProvinciaExists(dto.provincia.id);
        }
        const updatedEntity = DistritoEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: DistritoDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un distrito con el nombre '${nombre}'`);
        }
    }

    private async validateProvinciaExists(provinciaId: number): Promise<void> {
        const provincia = await this.provinciaRepository.findById(provinciaId);
        if (!provincia) {
            throw new NotFoundError(`Provincia con ID ${provinciaId} no encontrada`);
        }
    }
}