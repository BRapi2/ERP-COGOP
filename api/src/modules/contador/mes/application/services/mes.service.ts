import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { IMesRepository } from '../../domain/repositories/imes.repository';
import { Mes } from '../../domain/entities/mes.entity';
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { MesDto } from '../dto/mes.dto';

@injectable()
export class MesService {
    constructor(
        @inject('IMesRepository') private readonly repository: IMesRepository
    ) { }
    @Transactional("READ COMMITTED")
    public findAll(): Promise<Mes[]> {
        return this.repository.findAll();
    }

    @Transactional("READ COMMITTED")
    public async getById(id: number): Promise<Mes> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Mes ${id} no encontrado`);
        }
        return entity;
    }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<Mes> = {}): Promise<[Mes[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            throw new DatabaseError('Error al listar meses', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async create(dto: MesDto): Promise<Mes> {
        try {
            await validateOrReject(dto);
            const existingByName = await this.repository.findByName(dto.name);
            if (existingByName) {
                throw new ConflictError('Ya existe un mes con este nombre.');
            }
            const newEntity = Mes.crear(dto);
            return this.repository.save(newEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError) throw error;
            throw new DatabaseError('Error al crear el mes', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: MesDto): Promise<Mes> {
        try {
            await validateOrReject(dto);
            const entityToUpdate = await this.repository.findById(id);
            if (!entityToUpdate) {
                throw new NotFoundError('Mes no encontrado.');
            }
            const existingByName = await this.repository.findByName(dto.name, id);
            if (existingByName) {
                throw new ConflictError('Ya existe un mes con este nombre.');
            }
            const updatedEntity = Mes.crear({ ...entityToUpdate, ...dto, id: dto.id });
            return this.repository.save(updatedEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError || error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al actualizar el mes', error);
        }
    }
}
