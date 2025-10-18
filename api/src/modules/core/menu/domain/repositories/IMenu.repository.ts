import { FindManyOptions } from "typeorm";
import { Menu } from "../entities/menu.entity";
import { RolDto } from "../../../rol/application/dto/Rol.dto";

type DuplicateFilter = {
    nombre?: string;
    url?: string;
    rol?: RolDto | { id: number };
    parentId?: number;
    currentId?: number;
    message?: string;
    strictMode?: boolean;
};

export interface IMenuRepository {
    findAndCount(options: FindManyOptions<any>): Promise<[Menu[], number]>;
    findById(id: number): Promise<Menu | null>;
    save(entity: Menu): Promise<Menu>;
    validateUniqueConstraints(filters: DuplicateFilter): Promise<void>;
}
