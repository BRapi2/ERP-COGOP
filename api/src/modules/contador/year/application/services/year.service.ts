import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { IYearRepository } from '../../domain/repositories/iyear.repository';
import { Year } from '../../domain/entities/year.entity';
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { YearDto } from '../dto/year.dto';

@injectable()
export class YearService {
    constructor(
        @inject('IYearRepository') private readonly repository: IYearRepository
    ) { }
    public findAll(): Promise<Year[]> {
        return this.repository.findAll();
    }
    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<Year> = {}): Promise<[Year[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            console.log("VERIFICA ERRORES")
            console.log(error)
            throw new DatabaseError('Error al listar años', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async create(dto: YearDto): Promise<Year> {
        try {
            await validateOrReject(dto);
            const existingByName = await this.repository.findByName(dto.name);
            if (existingByName) {
                throw new ConflictError('Ya existe un año con este nombre.');
            }
            const newEntity = Year.crear(dto);
            return this.repository.save(newEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError) throw error;
            throw new DatabaseError('Error al crear el año', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: YearDto): Promise<Year> {
        try {
            await validateOrReject(dto);
            const entityToUpdate = await this.repository.findById(id);
            if (!entityToUpdate) {
                throw new NotFoundError('Año no encontrado.');
            }
            const existingByName = await this.repository.findByName(dto.name, id);
            if (existingByName) {
                throw new ConflictError('Ya existe un año con este nombre.');
            }
            const updatedEntityFinal = Year.crear({ ...entityToUpdate, ...dto, id: dto.id });
            return this.repository.save(updatedEntityFinal);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError || error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al actualizar el año', error);
        }
    }

    @Transactional("READ COMMITTED") // Changed to READ COMMITTED as it's a read operation
    async findById(id: number): Promise<Year | null> {
        try {
            const year = await this.repository.findById(id);
            if (!year) {
                throw new NotFoundError(`Año ${id} no encontrado`);
            }
            return year;
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al buscar año por: ', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async delete(id: number): Promise<void> {
        try {
            const entityToDelete = await this.repository.findById(id);
            if (!entityToDelete) {
                throw new NotFoundError('Año no encontrado para eliminar.');
            }
            await this.repository.delete(id);
        } catch (error) {
            if (error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al eliminar el año', error);
        }
    }
}
