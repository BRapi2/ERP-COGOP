import { injectable, inject } from "tsyringe";
import { FindManyOptions } from "typeorm";
import { validateOrReject } from "class-validator";
import { ICuentaContableRepository } from "../../domain/repositories/ICuentaContable.repository";
import { CuentaContable } from "../../domain/entities/CuentaContable.entity";
import { CuentaContableDto } from "../dto/CuentaContable.dto";
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from "../../../../../errors/custom.errors";
import { Transactional } from "../../../../../utils/transaction.decorator";

@injectable()
export class CuentaContableService {
    constructor(
        @inject("ICuentaContableRepository") private readonly repository: ICuentaContableRepository
    ) {}

    @Transactional("READ COMMITTED")
    public findAll(): Promise<CuentaContable[]> {
        return this.repository.findAll();
    }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<CuentaContable> = {}): Promise<[CuentaContable[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            throw new DatabaseError("Error al listar cuentas contables", error);
        }
    }

    @Transactional("READ COMMITTED")
    async findById(id: number): Promise<CuentaContable> {
        const entity = await this.repository.findById(id);
        if (!entity) {
            throw new NotFoundError(`Cuenta contable con ID ${id} no encontrada`);
        }
        return entity;
    }

    @Transactional("SERIALIZABLE")
    async create(dto: CuentaContableDto): Promise<CuentaContable> {
        await this.validateDto(dto);
        
        if (dto.codigoCuenta) {
            await this.validateUniqueCodigo(dto.codigoCuenta);
        }

        const newEntity = CuentaContable.crear(dto);
        return this.repository.save(newEntity);
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: CuentaContableDto): Promise<CuentaContable> {
        await this.validateDto(dto);
        const existing = await this.findById(id);

        if (dto.codigoCuenta && dto.codigoCuenta !== existing.codigoCuenta) {
            await this.validateUniqueCodigo(dto.codigoCuenta, id);
        }

        const updatedEntity = CuentaContable.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: CuentaContableDto): Promise<void> {
        try {
            await validateOrReject(dto);
        } catch (errors) {
            if (Array.isArray(errors)) {
                const errorMessages = errors.map(e => Object.values(e.constraints || {})).flat();
                throw new ConflictError(`Datos inválidos: ${errorMessages.join(", ")}`);
            }
            throw new ConflictError(`Error de validación no manejado`);
        }
    }

    private async validateUniqueCodigo(codigo: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByCodigo(codigo);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe una cuenta contable con el código '${codigo}'`);
        }
    }
}