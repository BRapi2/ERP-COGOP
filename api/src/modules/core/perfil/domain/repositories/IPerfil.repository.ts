import { FindManyOptions } from "typeorm";
import { PerfilEntity } from "../entities/perfil.entity";

export interface IPerfilRepository {
    findAll(): Promise<PerfilEntity[]>;
    findById(id: number): Promise<PerfilEntity | null>;
    findByNombre(nombre: string): Promise<PerfilEntity | null>;
    save(perfil: PerfilEntity): Promise<PerfilEntity>;
    findAndCount(options: FindManyOptions<PerfilEntity>): Promise<[PerfilEntity[], number]>;
}