import "reflect-metadata";
import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { MonedaDto } from '../dto/Moneda.dto';
import { Moneda } from '../../domain/entities/moneda.entity';
import { ConflictError, NotFoundError } from '../../../../../errors/custom.errors';
import { IMonedaRepository } from "../../domain/repositories/IMoneda.repository";

@injectable()
export class MonedaService {
    constructor(
        @inject('IMonedaRepository') private repository: IMonedaRepository
    ) { }

    public list(options: FindManyOptions<MonedaDto>): Promise<[Moneda[], number]> {
        return this.repository.findAndCount(options);
    }
    public obtenerMonedas(): Promise<Moneda[]> {
        return this.repository.obtenerMonedas();
    }
    public async create(dto: MonedaDto): Promise<Moneda> {
        await this.validateUniqueCodigo(dto.codigoMoneda);
        const newEntity = Moneda.crear(dto);
        return this.repository.save(newEntity);
    }

    public async update(id: number, dto: MonedaDto): Promise<Moneda> {
        const existing = await this.getExistingEntity(id);

        if (dto.codigoMoneda !== existing.codigoMoneda) {
            await this.validateUniqueCodigo(dto.codigoMoneda, id);
        }
        const updatedEntity = Moneda.crear({ ...existing, ...dto, id: dto.id });
        return this.repository.save(updatedEntity);
    }
    private async validateUniqueCodigo(codigo: string, excludeId?: number): Promise<void> {
        const exists = await this.repository.findDuplicateByCodigo(codigo, excludeId);
        if (exists) {
            throw new ConflictError(`El código '${codigo}' ya está registrado`);
        }
    }

    private async getExistingEntity(id: number): Promise<Moneda> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new NotFoundError(`Moneda con ID ${id} no encontrada`);
        return entity;
    }
}