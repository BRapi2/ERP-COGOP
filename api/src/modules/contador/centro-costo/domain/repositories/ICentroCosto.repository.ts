import { CentroCosto } from "../entities/CentroCosto.entity";
import { FindManyOptions } from "typeorm";

export interface ICentroCostoRepository {
    findById(id: number): Promise<CentroCosto | null>;
    findByCode(codigo: string): Promise<CentroCosto | null>;
    findByName(nombre: string): Promise<CentroCosto | null>;
    findDuplicateByCode(id: number, codigo: string): Promise<CentroCosto | null>;
    save(centroCosto: CentroCosto): Promise<CentroCosto>;
    findAndCount(options: FindManyOptions<CentroCosto>): Promise<[CentroCosto[], number]>;
}