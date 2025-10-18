import { FindManyOptions } from "typeorm";
import { TipoComprobante } from "../entities/comprobante.entity";

export interface ITipoComprobanteRepository {
    findById(id: number): Promise<TipoComprobante | null>;
    findByNombre(nombre: string): Promise<TipoComprobante | null>;
    findDuplicate(id: number, nombre: string): Promise<TipoComprobante | null>;
    save(tipoComprobante: TipoComprobante): Promise<TipoComprobante>;
    findAndCount(options: FindManyOptions<TipoComprobante>): Promise<[TipoComprobante[], number]>;
    obtenerTipoComprobante(): Promise<TipoComprobante[]>;
}