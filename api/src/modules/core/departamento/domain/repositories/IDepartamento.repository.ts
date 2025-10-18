import { FindManyOptions } from "typeorm";
import { DepartamentoEntity } from "../entities/Departamento.entity";

export interface IDepartamentoRepository {
    findAll(): Promise<DepartamentoEntity[]>;
    findById(id: number): Promise<DepartamentoEntity | null>;
    findByNombre(nombre: string): Promise<DepartamentoEntity | null>;
    save(departamento: DepartamentoEntity): Promise<DepartamentoEntity>;
    findAndCount(options: FindManyOptions<DepartamentoEntity>): Promise<[DepartamentoEntity[], number]>;
}