import { FindManyOptions } from "typeorm";
import { Mes } from "../entities/mes.entity";

export interface IMesRepository {
    findAndCount(options?: FindManyOptions<Mes>): Promise<[Mes[], number]>;
    findById(id: number): Promise<Mes | null>;
    findByName(name: string, excludeId?: number): Promise<Mes | null>;
    save(entity: Mes): Promise<Mes>;
    findAll(): Promise<Mes[]>;
}
