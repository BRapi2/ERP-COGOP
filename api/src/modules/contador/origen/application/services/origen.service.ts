import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { IOrigenRepository } from '../../domain/repositories/iorigen.repository';
import { Origen } from '../../domain/entities/origen.entity';
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { OrigenDto } from '../dto/origen.dto';

@injectable()
export class OrigenService {
    constructor(
        @inject('IOrigenRepository') private readonly repository: IOrigenRepository
    ) { }


    public async getById(id: number): Promise<Origen> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Origen ${id} no encontrado`);
        }
        return entity;
    }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<Origen> = {}): Promise<[Origen[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            throw new DatabaseError('Error al listar orígenes', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async create(dto: OrigenDto): Promise<Origen> {
        try {
            await validateOrReject(dto);
            const existingByCodigo = await this.repository.findByCodigo(dto.codigo);
            if (existingByCodigo) {
                throw new ConflictError('Ya existe un origen con este código.');
            }
            const existingByName = await this.repository.findByName(dto.nombre);
            if (existingByName) {
                throw new ConflictError('Ya existe un origen con este nombre.');
            }
            const newEntity = Origen.crear(dto);
            return this.repository.save(newEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError) throw error;
            throw new DatabaseError('Error al crear el origen', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: OrigenDto): Promise<Origen> {
        try {
            await validateOrReject(dto);
            const entityToUpdate = await this.repository.findById(id);
            if (!entityToUpdate) {
                throw new NotFoundError('Origen no encontrado.');
            }
            const existingByCodigo = await this.repository.findByCodigo(dto.codigo, id);
            if (existingByCodigo) {
                throw new ConflictError('Ya existe un origen con este código.');
            }
            const existingByName = await this.repository.findByName(dto.nombre);
            if (existingByName) {
                throw new ConflictError('Ya existe un origen con este nombre.');
            }
            const updatedEntity = Origen.crear({ ...entityToUpdate, ...dto, id: dto.id });
            return this.repository.save(updatedEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError || error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al actualizar el origen', error);
        }
    }
}
