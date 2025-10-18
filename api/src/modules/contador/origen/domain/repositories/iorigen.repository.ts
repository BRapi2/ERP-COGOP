import { FindManyOptions } from "typeorm";
import { Origen } from "../entities/origen.entity";

export interface IOrigenRepository {
    findAndCount(options: FindManyOptions<Origen>): Promise<[Origen[], number]>;
    findById(id: number): Promise<Origen | null>;
    findByCodigo(codigo: string, excludeId?: number): Promise<Origen | null>;
    findByName(nombre: string, excludeId?: number): Promise<Origen | null>;
    save(entity: Origen): Promise<Origen>;
}
