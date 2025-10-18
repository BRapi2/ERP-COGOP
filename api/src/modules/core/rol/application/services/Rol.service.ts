import { injectable, inject } from 'tsyringe';
import { validateOrReject } from 'class-validator';
import { FindManyOptions } from 'typeorm';
import { RolDto } from '../dto/Rol.dto';
import { IRolRepository } from '../../domain/repositories/IRol.repository';
import { Rol } from '../../domain/entities/rol.entity';
import { BusinessError, ValidationError } from '../../../../../errors/custom.errors';

@injectable()
export class RolService {
    constructor(@inject('IRolRepository') private readonly repository: IRolRepository) {}

    public findAll(): Promise<Rol[]> {
        return this.repository.findAll();
    }

    async list(options: FindManyOptions<Rol>): Promise<[Rol[], number]> {
        return this.repository.findAndCount(options || {});
    }

    async create(dto: RolDto): Promise<Rol> {
        try {
            await validateOrReject(dto);
            await this.validateCreationRules(dto);

            const newEntity = Rol.crear(dto);
            return await this.repository.save(newEntity);
        } catch (error) {
            if (Array.isArray(error) && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    async update(id: number, dto: RolDto): Promise<Rol> {
        try {
            await validateOrReject(dto);

            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new BusinessError('Registro no encontrado');
            }

            await this.validateCreationRules(dto, id);

            const updatedEntity = Rol.crear({ ...existing, ...dto, id });
            return this.repository.save(updatedEntity);
        } catch (error) {
            if (Array.isArray(error) && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    private async validateCreationRules(dto: RolDto, excludeId?: number): Promise<void> {
        await this.repository.validateUniqueConstraints({
            nombre: dto.nombre,
            currentId: excludeId,
            strictMode: true,
            message: "Ya existe un rol con este nombre"
        }).catch(error => {
            throw new ValidationError("Nombre duplicado", {
                originalError: error,
                conflictFields: ['nombre']
            });
        });
    }
}
