import { CuentaContable } from "../entities/CuentaContable.entity";
import { FindManyOptions } from "typeorm";

export interface ICuentaContableRepository {
    findAll(): Promise<CuentaContable[]>;
    findAndCount(options?: FindManyOptions<CuentaContable>): Promise<[CuentaContable[], number]>;
    findById(id: number): Promise<CuentaContable | null>;
    findByCodigo(codigo: string): Promise<CuentaContable | null>;
    save(entity: CuentaContable): Promise<CuentaContable>;
}