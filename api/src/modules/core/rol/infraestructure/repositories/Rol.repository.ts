import { injectable } from "tsyringe";
import { FindManyOptions, Not, Repository } from "typeorm";
import { AppDataSource } from "../../../../../db";
import { RolModel } from "../model/rol.models";
import { Rol } from "../../domain/entities/rol.entity";
import { RolMapping } from "../persistence/rol.mapping";
import { IRolRepository } from "../../domain/repositories/IRol.repository";
import { BusinessError, DatabaseError, EntityNotFoundError } from "../../../../../errors/custom.errors";

type DuplicateFilter = {
    nombre?: string;
    currentId?: number;
    message?: string;
    strictMode?: boolean;
};

@injectable()
export class RolRepository implements IRolRepository {
    private readonly ormRepository: Repository<RolModel>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(RolModel);
    }

    async findAll(): Promise<Rol[]> {
        const models = await this.ormRepository.find();
        return models.map(RolMapping.toEntity);
    }

    async findAndCount(options: FindManyOptions<RolModel>): Promise<[Rol[], number]> {
        const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(RolMapping.toEntity);
        return [entities, count];
    }

    async findById(id: number): Promise<Rol | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            if (!model) {
                throw new EntityNotFoundError(`Rol con id ${id} no encontrado`);
            }
            return RolMapping.toEntity(model);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw error;
            }
            throw new DatabaseError('Error al buscar entidad', error);
        }
    }

    async save(entity: Rol): Promise<Rol> {
        try {
            const model = RolMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return RolMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar entidad', error);
        }
    }

    async validateUniqueConstraints(filters: DuplicateFilter): Promise<void> {
        const where: any = {};
        if (filters.nombre) where.nombre = filters.nombre;
        if (filters.currentId) where.id = Not(filters.currentId);

        const duplicates = await this.ormRepository.find({ where });

        if (duplicates.length > 0) {
            if (filters.strictMode) {
                throw new BusinessError(
                    filters.message || "Registro duplicado con todos los campos especificados"
                );
            }

            const conflictReasons = duplicates.map(dup => {
                const matches = [];
                if (filters.nombre && dup.nombre === filters.nombre) matches.push("nombre");
                return `ID ${dup.id}: ${matches.join(" + ")}`;
            });

            if (conflictReasons.length > 0) {
                throw new BusinessError(
                    filters.message || `Conflictos detectados:\n${conflictReasons.join("\n")}`
                );
            }
        }
    }
}
