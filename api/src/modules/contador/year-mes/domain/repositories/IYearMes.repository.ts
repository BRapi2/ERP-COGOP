import { FindManyOptions } from "typeorm";
import { YearMesEntity } from "../entities/YearMes.entity";

export interface IYearMesRepository {
    findById(id: number): Promise<YearMesEntity | null>;
    findDuplicate(yearId: number, monthId: number, excludeId?: number): Promise<YearMesEntity | null>;
    save(yearMes: YearMesEntity): Promise<YearMesEntity>;
    findAndCount(options: FindManyOptions<YearMesEntity>): Promise<[YearMesEntity[], number]>;
    findAll(): Promise<YearMesEntity[]>;
}