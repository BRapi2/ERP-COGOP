import { FindManyOptions } from "typeorm";
import { ProvinciaEntity } from "../../domain/entities/Provincia.entity";

export interface IProvinciaRepository {
    findAll(): Promise<ProvinciaEntity[]>;
    findById(id: number): Promise<ProvinciaEntity | null>;
    findByNombre(nombre: string): Promise<ProvinciaEntity | null>;
    save(provincia: ProvinciaEntity): Promise<ProvinciaEntity>;
    findAndCount(options: FindManyOptions<ProvinciaEntity>): Promise<[ProvinciaEntity[], number]>;
}