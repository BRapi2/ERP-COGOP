import { injectable } from "tsyringe";
import { FindManyOptions, Not, Repository } from "typeorm";
import { AppDataSource2 } from "../../../../../db";
import { CuentaAjusteDiferenciaCambioModel } from "../model/cuenta-ajuste-diferencia-cambio.models";
import { CuentaAjusteDiferenciaCambio } from "../../domain/entities/cuenta-ajuste-diferencia-cambio.entity";
import { CuentaAjusteDiferenciaCambioMapping } from "../persistence/cuenta-ajuste-diferencia-cambio.mapping";
import { ICuentaAjusteRepository } from "../../domain/repositories/ICuentaAjuste.repository";
import { YearDto } from "../../application/dto/year.dto";
import { BusinessError, DatabaseError, EntityNotFoundError } from "../../../../../errors/custom.errors";

type DuplicateFilter = {
    nombre?: string;
    valor?: string;
    year?: YearDto | { id: number };
    currentId?: number;
    message?: string;
    strictMode?: boolean;
};

@injectable()
export class CuentaAjusteRepository implements ICuentaAjusteRepository {
    private readonly ormRepository: Repository<CuentaAjusteDiferenciaCambioModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(CuentaAjusteDiferenciaCambioModel);
    }

    async findAndCount(options: FindManyOptions<CuentaAjusteDiferenciaCambioModel>): Promise<[CuentaAjusteDiferenciaCambio[], number]> {
        const [models, count] = await this.ormRepository.findAndCount({ ...options, relations: ["year"] });
        //const [models, count] = await this.ormRepository.findAndCount(options);
        const entities = models.map(CuentaAjusteDiferenciaCambioMapping.toEntity);
        return [entities, count];
    }

    async findById(id: number): Promise<CuentaAjusteDiferenciaCambio | null> {
        try {
            const model = await this.ormRepository.findOne({
                where: { id },
                relations: ["year"]
            });
            if (!model) {
                throw new EntityNotFoundError(`CuentaAjuste con id ${id} no encontrada`);
            }
            return CuentaAjusteDiferenciaCambioMapping.toEntity(model);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw error;
            }
            throw new DatabaseError('Error al buscar entidad', error);
        }
    }

    async save(entity: CuentaAjusteDiferenciaCambio): Promise<CuentaAjusteDiferenciaCambio> {
        try {
            const model = CuentaAjusteDiferenciaCambioMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return CuentaAjusteDiferenciaCambioMapping.toEntity(savedModel);

        } catch (error) {
            throw new DatabaseError('Error al guardar entidad', error);
        }
    }

    async validateUniqueConstraints(filters: DuplicateFilter): Promise<void> {
        const where: any = {};

        if (filters.nombre) where.nombre = filters.nombre;
        if (filters.valor) where.valor = filters.valor;
        if (filters.year) where.year = { id: filters.year.id };
        if (filters.currentId) where.id = Not(filters.currentId);
        console.log("EL WHERE REPOSITORIO")
        console.log(where)
        const duplicates = await this.ormRepository.find({
            where,
            relations: ["year"]
        });

        if (duplicates.length > 0) {
            const conflictReasons = [];

            if (filters.strictMode) {
                throw new BusinessError(
                    filters.message || "Registro duplicado con todos los campos especificados"
                );
            }

            duplicates.forEach(dup => {
                const matches = [];
                if (filters.nombre && dup.nombre === filters.nombre) matches.push("nombre");
                if (filters.valor && dup.valor === filters.valor) matches.push("valor");
                if (filters.year && dup.year.id === filters.year.id) matches.push("año");

                if (matches.length > 0) {
                    conflictReasons.push(
                        `ID ${dup.id}: ${matches.join(" + ")}`
                    );
                }
            });

            if (conflictReasons.length > 0) {
                throw new BusinessError(
                    filters.message || `Conflictos detectados:\n${conflictReasons.join("\n")}`
                );
            }
        }
    }
}