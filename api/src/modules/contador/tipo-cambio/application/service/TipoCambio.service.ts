import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { ITipoCambioRepository } from '../../domain/repositories/ITipoCambio.repository';
import { TipoCambio } from '../../domain/entities/tipo-cambio.entity';
import { ConflictError, NotFoundError, ValidationError, BusinessError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { TipoCambioDto } from '../dto/TipoCambio.dto';

@injectable()
export class TipoCambioService {
    constructor(
        @inject('ITipoCambioRepository') private readonly repository: ITipoCambioRepository
    ) { }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<TipoCambio> = {}): Promise<[TipoCambio[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            throw new DatabaseError('Error al listar tipos de cambio', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async create(dto: TipoCambioDto): Promise<TipoCambioDto> {
        try {
            if (dto.monedaOrigen.id === dto.monedaDestino.id) {
                throw new ConflictError("La moneda de origen y destino no pueden ser la misma.");
            }
            const duplicado = await this.repository.findDuplicateInAnyDirection(dto.fecha, dto.monedaOrigen.id, dto.monedaDestino.id, dto.id);

            if (duplicado) {
                throw new ConflictError('Ya existe un tipo de cambio para esta combinación');
            }
            await validateOrReject(dto);
            const newEntity = TipoCambio.crear(dto);
            return await this.repository.save(newEntity);

        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError ||
                error instanceof NotFoundError ||
                error instanceof BusinessError) {
                throw error;
            }
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación en los datos', error);
            }
            throw new DatabaseError('Error al guardar el tipo de cambio 2', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: TipoCambioDto): Promise<TipoCambioDto> {
        try {
            await validateOrReject(dto);

            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new BusinessError('Registro no encontrado');
            }
            if (dto.monedaOrigen.id === dto.monedaDestino.id) {
                throw new ConflictError("La moneda de origen y destino no pueden ser la misma.");
            }
            const duplicado = await this.repository.findDuplicateInAnyDirection(dto.fecha, dto.monedaOrigen.id, dto.monedaDestino.id, dto.id);

            if (duplicado) {
                throw new ConflictError('Ya existe un tipo de cambio para esta combinación');
            }
            const updatedEntity = TipoCambio.crear({ ...existing, ...dto, id });
            return this.repository.save(updatedEntity);

        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            if (error instanceof ConflictError ||
                error instanceof NotFoundError ||
                error instanceof BusinessError) {
                throw error;
            }
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación en los datos', error);
            }

            throw new DatabaseError('Error al guardar el tipo de cambio', error);
        }
    }
}