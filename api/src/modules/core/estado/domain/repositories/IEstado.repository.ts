import { FindManyOptions } from "typeorm";
import { EstadoEntity } from "../entities/estado.entity";

export interface IEstadoRepository {
    //le agregue
    findAll(): Promise<EstadoEntity[]>;

    findAndCount(options: FindManyOptions<EstadoEntity>): Promise<[EstadoEntity[], number]>;
    findById(id: number): Promise<EstadoEntity | undefined>;
    findByNombre(nombre: string): Promise<EstadoEntity | undefined>;
    save(entity: EstadoEntity): Promise<EstadoEntity>;
}