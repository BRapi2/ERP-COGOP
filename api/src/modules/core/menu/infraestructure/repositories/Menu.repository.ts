import { injectable } from "tsyringe";
import { FindManyOptions, Not, Repository } from "typeorm";
import { AppDataSource } from "../../../../../db";
import { MenuModel } from "../model/menu.models";
import { Menu } from "../../domain/entities/menu.entity";
import { MenuMapping } from "../persistence/menu.mapping";
import { IMenuRepository } from "../../domain/repositories/IMenu.repository";
import { RolDto } from "../../../rol/application/dto/Rol.dto";
import { BusinessError, DatabaseError, EntityNotFoundError } from "../../../../../errors/custom.errors";

type DuplicateFilter = {
    nombre?: string;
    url?: string;
    rol?: RolDto | { id: number };
    parentId?: number;
    currentId?: number;
    message?: string;
    strictMode?: boolean;
};

@injectable()
export class MenuRepository implements IMenuRepository {
    private readonly ormRepository: Repository<MenuModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(MenuModel);
    }

    async findAndCount(options: FindManyOptions<MenuModel>): Promise<[Menu[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({
            ...options,
            relations: ["rol", "parent"]
        });
        const entities = models.map(MenuMapping.toEntity);
        return [entities, count];
    }

    async findById(id: number): Promise<Menu | null> {
        try {
            const model = await this.ormRepository.findOne({
                where: { id },
                relations: ["rol", "parent"]
            });

            if (!model) {
                throw new EntityNotFoundError(`Menú con id ${id} no encontrado`);
            }

            return MenuMapping.toEntity(model);
        } catch (error) {
            if (error instanceof EntityNotFoundError) throw error;
            throw new DatabaseError('Error al buscar menú', error);
        }
    }

    async save(entity: Menu): Promise<Menu> {
        try {
            const model = MenuMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return MenuMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar menú', error);
        }
    }

    async validateUniqueConstraints(filters: DuplicateFilter): Promise<void> {
        const where: any = {};
        if (filters.nombre) where.nombre = filters.nombre;
        if (filters.url) where.url = filters.url;
        if (filters.rol) where.rol = { id: filters.rol.id };
        if (filters.parentId !== undefined) where.parent_id = filters.parentId;
        if (filters.currentId) where.id = Not(filters.currentId);

        const duplicates = await this.ormRepository.find({ where, relations: ["rol"] });

        if (duplicates.length > 0) {
            const reasons = [];

            if (filters.strictMode) {
                throw new BusinessError(filters.message || "Registro duplicado detectado");
            }

            duplicates.forEach(dup => {
                const matches = [];
                if (filters.nombre && dup.nombre === filters.nombre) matches.push("nombre");
                if (filters.url && dup.url === filters.url) matches.push("url");
                if (filters.rol && dup.rol.id === filters.rol.id) matches.push("rol");
                if (filters.parentId !== undefined && dup.parent_id === filters.parentId) matches.push("parentId");

                if (matches.length > 0) {
                    reasons.push(`ID ${dup.id}: ${matches.join(" + ")}`);
                }
            });

            if (reasons.length > 0) {
                throw new BusinessError(filters.message || `Conflictos:\n${reasons.join("\n")}`);
            }
        }
    }
}
