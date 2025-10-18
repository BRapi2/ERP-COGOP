import "reflect-metadata";
import { TipoComprobante } from "../../domain/entities/comprobante.entity";
import { TipoComprobanteDto } from "../../application/dto/TipoComprobante.dto";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { NotFoundError, ConflictError } from '../../../../../errors/custom.errors';
import { ITipoComprobanteRepository } from "../../domain/repositories/ITipoComprobante.repository";

@injectable()
export class TipoComprobanteService {
    constructor(@inject('ITipoComprobanteRepository') private repository: ITipoComprobanteRepository) { }

    public async list(options: FindManyOptions<TipoComprobanteDto>): Promise<[TipoComprobante[], number]> {
        return await this.repository.findAndCount(options);
    }

    public obtenerTipoComprobante(): Promise<TipoComprobante[]> {
        return this.repository.obtenerTipoComprobante();
    }

    public async create(dto: TipoComprobanteDto): Promise<TipoComprobante> {
        await this.validateUniqueNombre(dto.nombre);
        const newEntity = TipoComprobante.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: TipoComprobanteDto): Promise<TipoComprobante> {
        const existingEntity = await this.getExistingEntity(id);
        if (dto.nombre !== existingEntity.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }
        const updatedEntity = TipoComprobante.crear({ ...existingEntity, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async getExistingEntity(id: number): Promise<TipoComprobante> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Tipo de Comprobante con ID ${id} no encontrado`);
        }
        return entity;
    }

    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = excludeId
            ? await this.repository.findDuplicate(excludeId, nombre)
            : await this.repository.findByNombre(nombre);

        if (existing) {
            throw new ConflictError(`El nombre '${nombre}' ya está registrado`);
        }
    }
}
