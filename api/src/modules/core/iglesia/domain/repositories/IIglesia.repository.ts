import { FindManyOptions } from "typeorm";
import { IglesiaEntity } from "../entities/iglesia.entity";

export interface IIglesiaRepository {
    findById(id: number): Promise<IglesiaEntity | null>;
    findDuplicate(nombre: string, excludeId?: number): Promise<IglesiaEntity | null>;
    save(iglesia: IglesiaEntity): Promise<IglesiaEntity>;
    findAndCount(options: FindManyOptions<IglesiaEntity>): Promise<[IglesiaEntity[], number]>;
    findAll(): Promise<IglesiaEntity[]>;
}
