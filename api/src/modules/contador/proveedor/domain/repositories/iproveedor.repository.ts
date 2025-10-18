
import { FindManyOptions } from "typeorm";
import { ProveedorEntity } from "../entities/Proveedor.entity";

export interface IProveedorRepository {
    findAll(): Promise<ProveedorEntity[]>;
    findAndCount(options?: FindManyOptions<ProveedorEntity>): Promise<[ProveedorEntity[], number]>;
    findById(id: number): Promise<ProveedorEntity | null>;
    findByRuc(ruc: string): Promise<ProveedorEntity | null>;
    findByNombre(nombre: string): Promise<ProveedorEntity | null>;
    save(entity: ProveedorEntity): Promise<ProveedorEntity>;
}