import { FindManyOptions } from "typeorm";
import { DistritoEntity } from "../../domain/entities/Distrito.entity";

export interface IDistritoRepository {
    findAll(): Promise<DistritoEntity[]>;
    findById(id: number): Promise<DistritoEntity | null>;
    findByNombre(nombre: string): Promise<DistritoEntity | null>;
    save(distrito: DistritoEntity): Promise<DistritoEntity>;
    findAndCount(options: FindManyOptions<DistritoEntity>): Promise<[DistritoEntity[], number]>;
}