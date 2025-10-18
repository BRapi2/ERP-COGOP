import { FindManyOptions, Repository, Not } from "typeorm";
import { validate } from "class-validator";
import { IYearMesRepository } from "../../domain/repositories/IYearMes.repository";
import { AppDataSource2 } from "../../../../../db";
import { YearMesModel } from "../model/YearMes.models";
import { YearMesMapping } from "../persistence/YearMes.mapping";
import { YearMesEntity } from "../../domain/entities/YearMes.entity";

export class YearMesRepository implements IYearMesRepository {
    private readonly ormRepository: Repository<YearMesModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(YearMesModel);
    }
    async findAll(): Promise<YearMesEntity[]> {
        const find = await this.ormRepository.find();
        return find.map(YearMesMapping.toEntity);
    }

    async findById(id: number): Promise<YearMesEntity | null> {
        const model = await this.ormRepository.findOneBy({ id });
        return model ? YearMesMapping.toEntity(model) : null;
    }

    async findDuplicate(yearId: number, monthId: number, excludeId?: number): Promise<YearMesEntity | null> {
        const where: any = {
            year: { id: yearId },
            mes: { id: monthId }
        };
        if (excludeId) {
            where.id = Not(excludeId);
        }
        const model = await this.ormRepository.findOne({
            where,
            relations: ["year", "mes"]
        });
        return model ? YearMesMapping.toEntity(model) : null;
    }

    async save(yearMes: YearMesEntity): Promise<YearMesEntity> {
        const model = YearMesMapping.toModel(yearMes);
        try {
            const savedModel = await this.ormRepository.save(model);
            return YearMesMapping.toEntity(savedModel);
        } catch (error) {
            throw error;
        }
    }

    async findAndCount(options?: FindManyOptions<YearMesEntity>): Promise<[YearMesEntity[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(YearMesMapping.toEntity);
        return [entities, count];
    }
}