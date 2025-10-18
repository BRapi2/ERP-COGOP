import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { Moneda } from '../../domain/entities/moneda.entity';
import { IMonedaRepository } from '../../domain/repositories/IMoneda.repository';
import { AppDataSource2 } from "../../../../../db";
import { MonedaMapping } from "../persistence/moneda.mapping";
import { MonedaModel } from "../model/moneda.models";

@injectable()
export class MonedaRepository implements IMonedaRepository {
    private readonly ormRepository: Repository<MonedaModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(MonedaModel);
    }
    async obtenerMonedas(): Promise<Moneda[]> {
        const model = await this.ormRepository.find();
        return model.map(MonedaMapping.toEntity);
    }

    async findAndCount(options?: FindManyOptions<MonedaModel>): Promise<[Moneda[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(MonedaMapping.toEntity);
        return [entities, count];
    }

    async findById(id: number): Promise<Moneda | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? MonedaMapping.toEntity(model) : null;
    }

    async findByCodigo(codigoMoneda: string): Promise<Moneda | null> {
        const model = await this.ormRepository.findOneBy({ codigoMoneda });
        return model ? MonedaMapping.toEntity(model) : null;
    }

    async findDuplicateByCodigo(codigoMoneda: string, currentId?: number): Promise<Moneda | null> {
        const where: any = { codigoMoneda };
        if (currentId) {
            where.id = Not(currentId);
        }
        const model = await this.ormRepository.findOne({ where });
        return model ? MonedaMapping.toEntity(model) : null;
    }

    async save(entity: Moneda): Promise<Moneda> {
        const model = MonedaMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return MonedaMapping.toEntity(savedModel);
    }
}