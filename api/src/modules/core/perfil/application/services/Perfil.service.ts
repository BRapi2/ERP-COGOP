import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validate } from "class-validator";
import { PerfilEntity } from "../../domain/entities/perfil.entity";
import { PerfilDto } from "../dto/Perfil.dto";
import { IPerfilRepository } from "../../domain/repositories/IPerfil.repository";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";

@injectable()
export class PerfilService {
    constructor(
        @inject('IPerfilRepository') private repository: IPerfilRepository
    ) { }

    public findAll(): Promise<PerfilEntity[]> {
        return this.repository.findAll();
    }

    public async list(options: FindManyOptions<PerfilEntity>): Promise<[PerfilEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async getById(id: number): Promise<PerfilEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Perfil con ID ${id} no encontrado`);
        }
        return entity;
    }

    public async create(dto: PerfilDto): Promise<PerfilEntity> {
        await this.validateDto(dto);

        // si necesitan validar unicidad de nombre+apellido, descomenta esto:
        // await this.validateUniquePerfil(dto.nombre, dto.apellido);

        const newEntity = PerfilEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: PerfilDto): Promise<PerfilEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);

        // si validan unicidad de nombre+apellido, puedes hacerlo aquí si cambiaron
        // if (dto.nombre !== existing.nombre || dto.apellido !== existing.apellido) {
        //     await this.validateUniquePerfil(dto.nombre, dto.apellido, id);
        // }

        const updatedEntity = PerfilEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: PerfilDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }

    // Si necesitas unicidad de nombre+apellido, implementa esta función:
    // private async validateUniquePerfil(nombre: string, apellido: string, excludeId?: number): Promise<void> {
    //     const existing = await this.repository.findByNombre(nombre);
    //     if (existing && (!excludeId || existing.id !== excludeId) && existing.apellido === apellido) {
    //         throw new ConflictError(`Ya existe un perfil con el nombre '${nombre} ${apellido}'`);
    //     }
    // }
}