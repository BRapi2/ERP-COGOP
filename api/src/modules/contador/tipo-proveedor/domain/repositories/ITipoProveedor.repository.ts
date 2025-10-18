import { FindManyOptions } from "typeorm";
import { TipoProveedor } from "../entities/TipoProveedor.entity";

export interface ITipoProveedorRepository {
    findAll(): Promise<TipoProveedor[]>;
    findAndCount(options?: FindManyOptions<TipoProveedor>): Promise<[TipoProveedor[], number]>;
    findById(id: number): Promise<TipoProveedor | null>;
    findByNombre(nombre: string, excludeId?: number): Promise<TipoProveedor | null>;
    save(entity: TipoProveedor): Promise<TipoProveedor>;
}