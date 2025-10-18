import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { YearModel } from "../model/year.model";
import { Year } from "../../domain/entities/year.entity";
import { YearMapping } from "../persistence/year.mapping";
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError, EntityNotFoundError } from '../../../../../errors/custom.errors';
import { IYearRepository } from '../../domain/repositories/iyear.repository';

@injectable()
export class YearRepository implements IYearRepository {
    private readonly ormRepository: Repository<YearModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(YearModel);
    }

    async findAll(): Promise<Year[]> {
        const model = await this.ormRepository.find();
        return model.map(YearMapping.toEntity);
    }

    async findAndCount(options: FindManyOptions<YearModel> = {}): Promise<[Year[], number]> {
        try {
            const [models, count] = await this.ormRepository.findAndCount(options);
            return [models.map(YearMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError('Error al buscar años', error);
        }
    }

    async findById(id: number): Promise<Year | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            return model ? YearMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar año por ID', error);
        }
    }

    async findByName(name: string, excludeId?: number): Promise<Year | null> {
        try {
            const whereOptions: any = { name };
            if (excludeId) {
                whereOptions.id = Not(excludeId);
            }
            const model = await this.ormRepository.findOne({ where: whereOptions });
            return model ? YearMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar año por nombre', error);
        }
    }

    async save(entity: Year): Promise<Year> {
        try {
            const model = YearMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return YearMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar año', error);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.ormRepository.delete(id);
            if (result.affected === 0) {
                throw new EntityNotFoundError(`Año con id ${id} no encontrado`);
            }
        } catch (error) {
            if (error instanceof EntityNotFoundError) throw error;
            throw new DatabaseError('Error al eliminar año', error);
        }
    }
}
