// src/modules/contador/tipo-proveedor/application/services/tipo-proveedor.service.ts
import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { ITipoProveedorRepository } from '../../domain/repositories/ITipoProveedor.repository';
import { TipoProveedor } from '../../domain/entities/TipoProveedor.entity';
import { TipoProveedorDto } from '../dto/TipoProveedor.dto';

@injectable()
export class TipoProveedorService {
    constructor(
        @inject('ITipoProveedorRepository') private readonly repository: ITipoProveedorRepository
    ) { }

    @Transactional("READ COMMITTED")
    public findAll(): Promise<TipoProveedor[]> {
        return this.repository.findAll();
    }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<TipoProveedor>): Promise<[TipoProveedor[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            console.log("ERROR EN EL SERVICIO")
            console.log(error)
            throw new DatabaseError('Error al listar tipos de proveedor', error);
        }
    }
    @Transactional("SERIALIZABLE")
    async create(dto: TipoProveedorDto): Promise<TipoProveedor> {
        try {
            await validateOrReject(dto);
            const existingByName = await this.repository.findByNombre(dto.nombre);
            if (existingByName) {
                throw new ConflictError('Ya existe un tipo de proveedor con este nombre.');
            }
            const newEntity = TipoProveedor.crear(dto);
            return this.repository.save(newEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError) throw error;
            throw new DatabaseError('Error al crear el tipo de proveedor', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: TipoProveedorDto): Promise<TipoProveedor> {
        try {
            await validateOrReject(dto);
            const entityToUpdate = await this.repository.findById(id);
            if (!entityToUpdate) {
                throw new NotFoundError('Tipo de proveedor no encontrado.');
            }
            const existingByName = await this.repository.findByNombre(dto.nombre, id);
            if (existingByName) {
                throw new ConflictError('Ya existe un tipo de proveedor con este nombre.');
            }
            const updatedEntity = TipoProveedor.crear({ ...entityToUpdate, ...dto, id: dto.id });
            return this.repository.save(updatedEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError || error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al actualizar el tipo de proveedor', error);
        }
    }
}