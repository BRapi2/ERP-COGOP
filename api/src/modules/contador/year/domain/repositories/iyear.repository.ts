import { FindManyOptions } from "typeorm";
import { Year } from "../entities/year.entity";

export interface IYearRepository {
    findAndCount(options?: FindManyOptions<Year>): Promise<[Year[], number]>;
    findAll(): Promise<Year[]>;
    findById(id: number): Promise<Year | null>;
    findByName(name: string, excludeId?: number): Promise<Year | null>;
    save(entity: Year): Promise<Year>;
    delete(id: number): Promise<void>;
}
