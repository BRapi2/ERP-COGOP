import { FindManyOptions } from "typeorm";
import { TipoDocumento } from "../entities/TipoDocumento.entity";

export interface ITipoDocumentoRepository {
    findAll(): Promise<TipoDocumento[]>;
    findAndCount(options?: FindManyOptions<TipoDocumento>): Promise<[TipoDocumento[], number]>;
    findById(id: number): Promise<TipoDocumento | null>;
    findByName(nombre: string, excludeId?: number): Promise<TipoDocumento | null>;
    save(entity: TipoDocumento): Promise<TipoDocumento>;
}