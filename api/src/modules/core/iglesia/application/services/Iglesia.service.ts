import "reflect-metadata";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { IIglesiaRepository } from "../../domain/repositories/IIglesia.repository";
import { IDistritoRepository } from "../../../distrito/domain/repositories/IDistrito.repository";
import { IEstadoRepository } from "../../../estado/domain/repositories/IEstado.repository";
import { validate } from "class-validator";
import { IglesiaDto } from "../dto/Iglesia.dto";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { IglesiaEntity } from "../../domain/entities/iglesia.entity";

@injectable()
export class IglesiaService {
    constructor(
        @inject('IIglesiaRepository') private repository: IIglesiaRepository,
        @inject('IDistritoRepository') private distritoRepository: IDistritoRepository,
        @inject('IEstadoRepository') private estadoRepository: IEstadoRepository
    ) { }

    public async list(options: FindManyOptions<IglesiaEntity>): Promise<[IglesiaEntity[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async listAll(): Promise<IglesiaEntity[]> {
        return await this.repository.findAll();
    }

    public async getById(id: number): Promise<IglesiaEntity> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Iglesia con ID ${id} no encontrada`);
        }
        return entity;
    }

    public async create(dto: IglesiaDto): Promise<IglesiaEntity> {
        await this.validateDto(dto);
        await this.validateUniqueConstraints(dto);
        if (dto.distrito.id) {
            await this.validateDistritoExists(dto.distrito.id);
        }
        if (dto.estado.id) {
            await this.validateEstadoExists(dto.estado.id);
        }
        const newEntity = IglesiaEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: IglesiaDto): Promise<IglesiaEntity> {
        await this.validateDto(dto);
        const existing = await this.getById(id);
        await this.validateUniqueConstraints(dto, id);

        if (dto.distrito.id !== existing.distrito.id) {
            await this.validateDistritoExists(dto.distrito.id);
        }
        if (dto.estado.id !== existing.estado.id) {
            await this.validateEstadoExists(dto.estado.id);
        }
        const updatedEntity = IglesiaEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: IglesiaDto): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
            throw new ConflictError(`Datos inválidos: ${errorMessages.join(', ')}`);
        }
    }
    private async validateDistritoExists(distritoId: number): Promise<void> {
        const distrito = await this.distritoRepository.findById(distritoId);
        if (!distrito) {
            throw new NotFoundError(`Distrito no encontrado`);
        }
    }

    private async validateEstadoExists(estadoId: number): Promise<void> {
        const estado = await this.estadoRepository.findById(estadoId);
        if (!estado) {
            throw new NotFoundError(`Estado no encontrado`);
        }
    }
    private async validateUniqueConstraints(
        dto: IglesiaDto,
        excludeId?: number
    ): Promise<void> {
        if (!dto.nombre || !dto.distrito?.id) {
            return;
        }
        const duplicate = await this.repository.findDuplicate(
            dto.nombre,
            excludeId
        );
        if (duplicate) {
            throw new ConflictError(
                `Ya existe una iglesia con el nombre "${dto.nombre}" en el distrito ${dto.distrito.id}`
            );
        }
    }
}
