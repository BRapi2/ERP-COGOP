import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { TipoDocumento } from '../../domain/entities/TipoDocumento.entity';
import { ITipoDocumentoRepository } from '../../domain/repositories/ITipoDocumento.repository';
import { TipoDocumentoDto } from '../dto/TipoDocumento.dto';

@injectable()
export class TipoDocumentoService {
    constructor(
        @inject('ITipoDocumentoRepository') private readonly repository: ITipoDocumentoRepository
    ) { }

    @Transactional("READ COMMITTED")
    public findAll(): Promise<TipoDocumento[]> {
        return this.repository.findAll();
    }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<TipoDocumento> = {}): Promise<[TipoDocumento[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            throw new DatabaseError('Error al listar tipos de documento', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async create(dto: TipoDocumentoDto): Promise<TipoDocumento> {
        try {
            await validateOrReject(dto);
            const existingByName = await this.repository.findByName(dto.nombre);
            if (existingByName) {
                throw new ConflictError('Ya existe un tipo de documento con este nombre.');
            }
            const newEntity = TipoDocumento.crear(dto);
            return this.repository.save(newEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError) throw error;
            throw new DatabaseError('Error al crear el tipo de documento', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: TipoDocumentoDto): Promise<TipoDocumento> {
        try {
            await validateOrReject(dto);
            const entityToUpdate = await this.repository.findById(id);
            if (!entityToUpdate) {
                throw new NotFoundError('Tipo de documento no encontrado.');
            }
            const existingByName = await this.repository.findByName(dto.nombre, id);
            if (existingByName) {
                throw new ConflictError('Ya existe un tipo de documento con este nombre.');
            }
            const updatedEntity = TipoDocumento.crear({ ...entityToUpdate, ...dto, id: dto.id });
            return this.repository.save(updatedEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError || error instanceof NotFoundError) throw error;
            throw new DatabaseError('Error al actualizar el tipo de documento', error);
        }
    }
}