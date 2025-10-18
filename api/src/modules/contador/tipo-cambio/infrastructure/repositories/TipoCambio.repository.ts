import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { TipoCambioModels } from "../model/tipo-cambio.models";
import { TipoCambio } from "../../domain/entities/tipo-cambio.entity";
import { TipoCambioMapping } from "../persistence/tipo-cambio.mapping";
import { AppDataSource2 } from "../../../../../db";
import { BusinessError, ConflictError, DatabaseError, EntityNotFoundError } from '../../../../../errors/custom.errors';
import { ITipoCambioRepository } from '../../domain/repositories/ITipoCambio.repository';

@injectable()
export class TipoCambioRepository implements ITipoCambioRepository {

    private readonly ormRepository: Repository<TipoCambioModels>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(TipoCambioModels);
    }

    async findAndCount(options: FindManyOptions<TipoCambioModels> = {}): Promise<[TipoCambio[], number]> {
        try {
            const [models, count] = await this.ormRepository.findAndCount({
                ...options,
                relations: { monedaDestino: true, monedaOrigen: true }
            });
            return [models.map(TipoCambioMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError('Error al buscar tipos de cambio', error);
        }
    }

    async findById(id: number): Promise<TipoCambio> {
        try {
            const model = await this.ormRepository.findOne({
                where: { id },
                relations: { monedaDestino: true, monedaOrigen: true }
            });

            if (!model) {
                throw new EntityNotFoundError(`Tipo de cambio con id ${id} no encontrado`);
            }

            return TipoCambioMapping.toEntity(model);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw error;
            }
            throw new DatabaseError('Error al buscar tipo de cambio por ID', error);
        }
    }

    async save(entity: TipoCambioModels): Promise<TipoCambio> {
        try {
            const model = TipoCambioMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return TipoCambioMapping.toEntity(savedModel);
        } catch (error) {
            if (error instanceof BusinessError) {
                throw error;
            }
            throw new DatabaseError('Error al guardar tipo de cambio', error);
        }
    }

    async findDuplicateInAnyDirection(fecha: Date, monedaAId: number, monedaBId: number, excludeId?: number): Promise<TipoCambio | null> {
        const where = [
            {
                fecha,
                monedaOrigen: { id: monedaAId },
                monedaDestino: { id: monedaBId },
                ...(excludeId && { id: Not(excludeId) })
            },
            {
                fecha,
                monedaOrigen: { id: monedaBId },
                monedaDestino: { id: monedaAId },
                ...(excludeId && { id: Not(excludeId) })
            }
        ];

        const model = await this.ormRepository.findOne({
            where,
            relations: { monedaDestino: true, monedaOrigen: true }
        });

        return model ? TipoCambioMapping.toEntity(model) : null;
    }
}