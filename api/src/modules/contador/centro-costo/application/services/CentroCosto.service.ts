import "reflect-metadata";
import { CentroCosto } from "../../domain/entities/CentroCosto.entity";
import { CentroCostoDto } from "../dto/CentroCosto.dto";
import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { NotFoundError, ConflictError } from '../../../../../errors/custom.errors';
import { ICentroCostoRepository } from "../../domain/repositories/ICentroCosto.repository";

@injectable()
export class CentroCostoService {
    constructor(@inject('ICentroCostoRepository') private repository: ICentroCostoRepository) { }

    public async list(options: FindManyOptions<CentroCostoDto>): Promise<[CentroCosto[], number]> {
        return await this.repository.findAndCount(options);
    }

    public async create(dto: CentroCostoDto): Promise<CentroCosto> {
        await this.validateUniqueConstraints(dto);
        const newEntity = CentroCosto.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: CentroCostoDto): Promise<CentroCosto> {
        const centroCosto = await this.getExistingOrThrow(id);
        await this.validateUniqueConstraints(dto, id);

        const updatedEntity = CentroCosto.crear({ ...centroCosto, ...dto, id });
        return this.repository.save(updatedEntity);
    }
    private async getExistingOrThrow(id: number): Promise<CentroCosto> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundError(`Centro de Costo con ID ${id} no encontrado`);
        }
        return existing;
    }
    private async validateUniqueConstraints(
        dto: CentroCostoDto,
        excludeId?: number
    ): Promise<void> {
        const [existingCode, existingName] = await Promise.all([
            excludeId
                ? this.repository.findDuplicateByCode(excludeId, dto.codigo)
                : this.repository.findByCode(dto.codigo),
            this.repository.findByName(dto.nombre)
        ]);

        if (existingCode) {
            throw new ConflictError(`El código '${dto.codigo}' ya está en uso`);
        }

        if (existingName && (!excludeId || existingName.id !== excludeId)) {
            throw new ConflictError(`El nombre '${dto.nombre}' ya existe`);
        }
    }
}
