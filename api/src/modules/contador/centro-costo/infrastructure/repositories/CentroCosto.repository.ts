import { CentroCosto } from "../../domain/entities/CentroCosto.entity"
import { FindManyOptions, Not, Repository } from "typeorm";
import { injectable } from "tsyringe";
import { ICentroCostoRepository } from "../../domain/repositories/ICentroCosto.repository";
import { AppDataSource2 } from "../../../../../db";
import { CentroCostoMapping } from "../persistence/centro-costo.mapping";
import { CentroCostoModel } from "../model/CentroCosto.models";

@injectable()
export class CentroCostoRepository implements ICentroCostoRepository {

    private readonly ormRepository: Repository<CentroCostoModel>;
    constructor() {
        this.ormRepository = AppDataSource2.getRepository(CentroCostoModel);
    }
    
    async findAndCount(options?: FindManyOptions<CentroCosto>): Promise<[CentroCosto[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(CentroCostoMapping.toEntity);
        return [entities, count];
    }

    async findById(id: number): Promise<CentroCosto | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? CentroCostoMapping.toEntity(model) : null;
    }

    async findByCode(codigo: string): Promise<CentroCosto | null> {
        const model = await this.ormRepository.findOneBy({ codigo });
        return model ? CentroCostoMapping.toEntity(model) : null;
    }

    async findByName(nombre: string): Promise<CentroCosto | null> {
        const model = await this.ormRepository.findOneBy({ nombre });
        return model ? CentroCostoMapping.toEntity(model) : null;
    }

    async findDuplicateByCode(id: number, codigo: string): Promise<CentroCosto | null> {
        const where: any = { codigo };
        if (id) {
            where.id = Not(id);
        }
        const model = await this.ormRepository.findOne({ where });
        return model ? CentroCostoMapping.toEntity(model) : null;
    }

    async save(entity: CentroCosto): Promise<CentroCosto> {
        const model = CentroCostoMapping.toModel(entity);
        try {
            const savedModel = await this.ormRepository.save(model);
            return CentroCostoMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }
}
