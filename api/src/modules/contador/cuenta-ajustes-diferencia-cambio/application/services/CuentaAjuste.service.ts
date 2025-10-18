import { injectable, inject } from 'tsyringe';
import { validateOrReject } from 'class-validator';
import { FindManyOptions } from 'typeorm';
import { CuentaAjusteDto } from '../dto/CuentaAjuste.dto';
import { ICuentaAjusteRepository } from '../../domain/repositories/ICuentaAjuste.repository';
import { CuentaAjusteDiferenciaCambio } from '../../domain/entities/cuenta-ajuste-diferencia-cambio.entity';
import { BusinessError, ValidationError } from '../../../../../errors/custom.errors';

@injectable()
export class CuentaAjusteService {
    constructor(@inject('ICuentaAjusteRepository') private readonly repository: ICuentaAjusteRepository) { }

    async list(options: FindManyOptions<CuentaAjusteDiferenciaCambio>): Promise<[CuentaAjusteDiferenciaCambio[], number]> {
        return this.repository.findAndCount(options || {});
    }


    async create(dto: CuentaAjusteDto): Promise<CuentaAjusteDiferenciaCambio> {
        try {
            await validateOrReject(dto);

            await this.validateCreationRules(dto);

            const newEntity = CuentaAjusteDiferenciaCambio.crear(dto);
            return await this.repository.save(newEntity);

        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    async update(id: number, dto: CuentaAjusteDto): Promise<CuentaAjusteDiferenciaCambio> {
        try {
            await validateOrReject(dto);

            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new BusinessError('Registro no encontrado');
            }
            await this.validateCreationRules(dto);

            const updatedEntity = CuentaAjusteDiferenciaCambio.crear({ ...existing, ...dto, id });
            return this.repository.save(updatedEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    private async validateCreationRules(dto: CuentaAjusteDto, excludeId?: number): Promise<void> {
        const validationRules = [
            {
                filters: { nombre: dto.nombre, valor: dto.valor, year: dto.year, currentId: excludeId },
                message: "Ya existe un registro idéntico (nombre + valor + año)"
            },
            {
                filters: { nombre: dto.nombre, year: dto.year, currentId: excludeId },
                message: "Ya existe un registro con este nombre y año (con cualquier valor)"
            },
            {
                filters: { valor: dto.valor, year: dto.year, currentId: excludeId },
                message: "Ya existe un registro con este valor y año (con cualquier nombre)"
            }
        ];

        for (const rule of validationRules) {
            await this.repository.validateUniqueConstraints({
                ...rule.filters,
                strictMode: true
            }).catch(error => {
                throw new ValidationError(rule.message, { 
                    originalError: error,
                    conflictFields: Object.keys(rule.filters).filter(k => k !== 'currentId')
                });
            });
        }
    }
}