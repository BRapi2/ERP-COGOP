// src/modules/contador/cuenta-contable/infrastructure/repositories/CuentaContable.repository.ts
import { injectable } from "tsyringe";
import { FindManyOptions, Repository } from "typeorm";
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError } from "../../../../../errors/custom.errors";
import { CuentaContableModel } from "../model/CuentaContable.model";
import { CuentaContable } from "../../domain/entities/CuentaContable.entity";
import { CuentaContableMapping } from "../persistence/CuentaContable.mapping";
import { ICuentaContableRepository } from "../../domain/repositories/ICuentaContable.repository";

@injectable()
export class CuentaContableRepository implements ICuentaContableRepository {
    private readonly ormRepository: Repository<CuentaContableModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(CuentaContableModel);
    }

    async findAll(): Promise<CuentaContable[]> {
        const models = await this.ormRepository.find();
        return models.map(CuentaContableMapping.toEntity);
    }

    async findAndCount(options: FindManyOptions<CuentaContableModel>): Promise<[CuentaContable[], number]> {
        try {
            const [models, count] = await this.ormRepository.findAndCount(options);
            return [models.map(CuentaContableMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError("Error al buscar cuentas contables", error);
        }
    }

    async findById(id: number): Promise<CuentaContable | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            return model ? CuentaContableMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError("Error al buscar cuenta contable por ID", error);
        }
    }

    async findByCodigo(codigo: string): Promise<CuentaContable | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { codigoCuenta: codigo } });
            return model ? CuentaContableMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError("Error al buscar cuenta contable por código", error);
        }
    }

    async save(entity: CuentaContable): Promise<CuentaContable> {
        try {
            const model = CuentaContableMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return CuentaContableMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError("Error al guardar cuenta contable", error);
        }
    }
}