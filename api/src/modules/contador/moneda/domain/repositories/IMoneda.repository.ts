import { FindManyOptions } from "typeorm";
import { Moneda } from "../entities/moneda.entity";

export interface IMonedaRepository {
    findAndCount(options?: FindManyOptions<any>): Promise<[Moneda[], number]>;
    obtenerMonedas(): Promise<Moneda[]>;
    findById(id: number): Promise<Moneda | null>;
    findByCodigo(codigoMoneda: string): Promise<Moneda | null>;
    findDuplicateByCodigo(codigoMoneda: string, currentId?: number): Promise<Moneda | null>;
    save(moneda: Moneda): Promise<Moneda>;
}