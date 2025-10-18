import { FindManyOptions } from "typeorm";
import { TipoCambio } from "../entities/tipo-cambio.entity";

export interface ITipoCambioRepository {
    findAndCount(options: FindManyOptions<TipoCambio>): Promise<[TipoCambio[], number]>;
    findById(id: number): Promise<TipoCambio | null>;
    save(entity: TipoCambio): Promise<TipoCambio>;
    findDuplicateInAnyDirection(fecha: Date, monedaAId: number, monedaBId: number, excludeId?: number): Promise<TipoCambio | null>;
}