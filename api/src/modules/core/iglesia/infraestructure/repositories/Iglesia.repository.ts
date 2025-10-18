import { FindManyOptions, Repository, Not } from "typeorm";
import { validate } from "class-validator";
import { IIglesiaRepository } from "../../domain/repositories/IIglesia.repository";
import { AppDataSource } from "../../../../../db";
import { IglesiaModel } from "../model/iglesia.models";
import { IglesiaEntity } from "../../domain/entities/iglesia.entity";
import { IglesiaMapping } from "../persistence/iglesia.mapping";


export class IglesiaRepository implements IIglesiaRepository {
    private readonly ormRepository: Repository<IglesiaModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(IglesiaModel);
    }

    async findAll(): Promise<IglesiaEntity[]> {
        const find = await this.ormRepository.find({
            relations: ["distrito", "estado"]
        });
        return find.map(IglesiaMapping.toEntity);
    }

    async findDuplicate(nombre: string, excludeId?: number): Promise<IglesiaEntity | null> {
        const where: any = {
            nombre: nombre,
        };
        if (excludeId) {
            where.id = Not(excludeId);
        }
        const model = await this.ormRepository.findOne({
            where,
            relations: ["distrito", "estado"]
        });
        return model ? IglesiaMapping.toEntity(model) : null;
    }


    async findById(id: number): Promise<IglesiaEntity | null> {
        const model = await this.ormRepository.findOne({
            where: { id },
            relations: ["distrito", "estado"]
        });
        return model ? IglesiaMapping.toEntity(model) : null;
    }

    async findAndCount(options?: FindManyOptions<IglesiaEntity>): Promise<[IglesiaEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            relations: ["distrito", "estado"]
        });
        const entities = models.map(IglesiaMapping.toEntity);
        return [entities, count];
    }

    async save(iglesia: IglesiaEntity): Promise<IglesiaEntity> {
        const model = IglesiaMapping.toModel(iglesia);
        try {
            const savedModel = await this.ormRepository.save(model);
            return IglesiaMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }
}
