import { FindManyOptions, Repository } from "typeorm";
import { IDistritoRepository } from "../../domain/repositories/IDistrito.repository";
import { DistritoModel } from "../model/Distrito.model";
import { AppDataSource } from "../../../../../db";
import { DistritoEntity } from "../../domain/entities/Distrito.entity";
import { DistritoMapping } from "../persistence/Distrito.mapping";

export class DistritoRepository implements IDistritoRepository {
    private readonly ormRepository: Repository<DistritoModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(DistritoModel);
    }
    async findAll(): Promise<DistritoEntity[]> {
        const model = await this.ormRepository.find({
            relations: {
                provincia: {
                    departamento: true
                }
            }
        });
        return model.map(DistritoMapping.toEntity);
    }


    async findById(id: number): Promise<DistritoEntity | null> {
        return this.ormRepository.findOne({
            where: { id },
            relations: ['provincia']
        });
    }

    async findByNombre(nombre: string): Promise<DistritoEntity | null> {
        const model = await this.ormRepository.findOne({ where: { nombre } });
        return model ? DistritoMapping.toEntity(model) : null;
    }

    async save(entity: DistritoEntity): Promise<DistritoEntity> {
        const model = DistritoMapping.toModel(entity);
        const savedModel = await this.ormRepository.save(model);
        return DistritoMapping.toEntity(savedModel);
    }

    async findAndCount(options: FindManyOptions<DistritoEntity>): Promise<[DistritoEntity[], number]> {
        const modelOptions: FindManyOptions<DistritoModel> = { ...options, relations: ['provincia'] };
        const [models, count] = await this.ormRepository.findAndCount(modelOptions);
        const entities = models.map(DistritoMapping.toEntity);
        return [entities, count];
    }
}