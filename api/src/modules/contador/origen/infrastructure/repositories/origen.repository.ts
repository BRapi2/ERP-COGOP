import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { OrigenModel } from "../model/origen.model";
import { Origen } from "../../domain/entities/origen.entity";
import { OrigenMapping } from "../persistence/origen.mapping";
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError, EntityNotFoundError } from '../../../../../errors/custom.errors';
import { IOrigenRepository } from '../../domain/repositories/iorigen.repository';

@injectable()
export class OrigenRepository implements IOrigenRepository {
    private readonly ormRepository: Repository<OrigenModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(OrigenModel);
    }
    async findByName(nombre: string, excludeId?: number): Promise<Origen | null> {
        try {
            const whereOptions: any = { nombre };
            if (excludeId) {
                whereOptions.id = Not(excludeId);
            }
            const model = await this.ormRepository.findOne({ where: whereOptions });
            if (!model) {
                return null;
            }
            return OrigenMapping.toEntity(model);
        } catch (error) {
            throw new DatabaseError('Error al buscar origen por nombre', error);
        }
    }

    async findAndCount(options: FindManyOptions<OrigenModel> = {}): Promise<[Origen[], number]> {
        try {
            const [models, count] = await this.ormRepository.findAndCount(options);
            return [models.map(OrigenMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError('Error al buscar orígenes', error);
        }
    }

    async findById(id: number): Promise<Origen | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            if (!model) {
                return null;
            }
            return OrigenMapping.toEntity(model);
        } catch (error) {
            throw new DatabaseError('Error al buscar origen por ID', error);
        }
    }

    async findByCodigo(codigo: string, excludeId?: number): Promise<Origen | null> {
        try {
            const whereOptions: any = { codigo };
            if (excludeId) {
                whereOptions.id = Not(excludeId);
            }
            const model = await this.ormRepository.findOne({ where: whereOptions });
            if (!model) {
                return null;
            }
            return OrigenMapping.toEntity(model);
        } catch (error) {
            throw new DatabaseError('Error al buscar origen por código', error);
        }
    }

    async save(entity: Origen): Promise<Origen> {
        try {
            const model = OrigenMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return OrigenMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar origen', error);
        }
    }
}