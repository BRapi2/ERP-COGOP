import { FindManyOptions } from "typeorm";
import { Rol } from "../entities/rol.entity";

type DuplicateFilter = {
    nombre?: string;
    currentId?: number;
    message?: string;
    strictMode?: boolean;
};

export interface IRolRepository {
    findAll(): Promise<Rol[]>;
    findAndCount(options: FindManyOptions<Rol>): Promise<[Rol[], number]>;
    findById(id: number): Promise<Rol | null>;
    save(entity: Rol): Promise<Rol>;
    validateUniqueConstraints(filters: DuplicateFilter): Promise<void>;
}
