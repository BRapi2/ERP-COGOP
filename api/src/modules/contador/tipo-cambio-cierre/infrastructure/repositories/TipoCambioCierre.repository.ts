import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource2 } from "../../../../../db";
import { TipoCambioCierreMapping } from "../persistence/TipoCambioCierre.mapping";
import { TipoCambioCierreEntity } from "../../domain/entities/TipoCambioCierre.entity";
import { TipoCambioCierreModel } from "../model/tipo-cambio-cierre.models";
import { ITipoCambioCierreRepository } from "../../domain/repositories/ITipoCambioCierre.repository";

export class TipoCambioCierreRepository implements ITipoCambioCierreRepository {
    private readonly ormRepository: Repository<TipoCambioCierreModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(TipoCambioCierreModel);
    }

    async findById(id: number): Promise<TipoCambioCierreEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? TipoCambioCierreMapping.toEntity(model) : null;
    }

    async findByYearMesId(yearMesId: number): Promise<TipoCambioCierreEntity | null> {
        const model = await this.ormRepository.findOne({ 
            where: { yearMes: { id: yearMesId } },
            relations: ["year", "mes"]
        });
        return model ? TipoCambioCierreMapping.toEntity(model) : null;
    }

    async save(entity: TipoCambioCierreEntity): Promise<TipoCambioCierreEntity> {
        const model = TipoCambioCierreMapping.toModel(entity);
        try {
            const savedModel = await this.ormRepository.save(model);
            return TipoCambioCierreMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }

    async findAndCount(options: FindManyOptions<TipoCambioCierreEntity>): Promise<[TipoCambioCierreEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(TipoCambioCierreMapping.toEntity);
        return [entities, count];
    }
}