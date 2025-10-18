import { FindManyOptions } from "typeorm";
import { EstadoEntity } from "../entities/Estado.entity";

export interface IEstadoRepository {
    findAll(): Promise<EstadoEntity[]>;
    findById(id: number): Promise<EstadoEntity | null>;
    findByNombre(nombre: string): Promise<EstadoEntity | null>;
    save(estado: EstadoEntity): Promise<EstadoEntity>;
    findAndCount(options: FindManyOptions<EstadoEntity>): Promise<[EstadoEntity[], number]>;
    delete(id: number): Promise<void>;
}