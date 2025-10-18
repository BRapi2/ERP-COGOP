import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { MesModel } from "../model/mes.model";
import { Mes } from "../../domain/entities/mes.entity";
import { MesMapping } from "../persistence/mes.mapping";
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError, EntityNotFoundError } from '../../../../../errors/custom.errors';
import { IMesRepository } from '../../domain/repositories/imes.repository';

@injectable()
export class MesRepository implements IMesRepository {
    private readonly ormRepository: Repository<MesModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(MesModel);
    }
    async findAll(): Promise<Mes[]> {
        const find = await this.ormRepository.find();
        return find.map(MesMapping.toEntity);
    }

    async findAndCount(options: FindManyOptions<MesModel> = {}): Promise<[Mes[], number]> {
        try {
            const [models, count] = await this.ormRepository.findAndCount(options);
            return [models.map(MesMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError('Error al buscar meses', error);
        }
    }

    async findById(id: number): Promise<Mes | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            return model ? MesMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar mes por ID', error);
        }
    }

    async findByName(name: string, excludeId?: number): Promise<Mes | null> {
        try {
            const whereOptions: any = { name };
            if (excludeId) {
                whereOptions.id = Not(excludeId);
            }
            const model = await this.ormRepository.findOne({ where: whereOptions });
            return model ? MesMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar mes por nombre', error);
        }
    }

    async save(entity: Mes): Promise<Mes> {
        try {
            const model = MesMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return MesMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar mes', error);
        }
    }
}
