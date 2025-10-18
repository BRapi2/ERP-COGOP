import { injectable, inject } from 'tsyringe';
import { validateOrReject } from 'class-validator';
import { FindManyOptions } from 'typeorm';
import { MenuDto } from '../dto/Menu.dto';
import { IMenuRepository } from '../../domain/repositories/IMenu.repository';
import { Menu } from '../../domain/entities/menu.entity';
import { BusinessError, ValidationError } from '../../../../../errors/custom.errors';

@injectable()
export class MenuService {
    constructor(@inject('IMenuRepository') private readonly repository: IMenuRepository) {}

    async list(options: FindManyOptions<any>): Promise<[Menu[], number]> {
        return this.repository.findAndCount(options || {});
    }

    async create(dto: MenuDto): Promise<Menu> {
        try {
            await validateOrReject(dto);

            await this.validateCreationRules(dto);

            const { parent, ...dtoWithoutParent } = dto;
            const newEntity = Menu.crear(dtoWithoutParent);

            return await this.repository.save(newEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    async update(id: number, dto: MenuDto): Promise<Menu> {
        
        try {
            await validateOrReject(dto);

            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new BusinessError('Registro no encontrado');
            }

            await this.validateCreationRules(dto, id);

            const { parent, ...dtoWithoutParent } = dto;
            const updatedEntity = Menu.crear({ ...existing, ...dtoWithoutParent, id });

            return await this.repository.save(updatedEntity);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    private async validateCreationRules(dto: MenuDto, excludeId?: number): Promise<void> {
        const validationRules = [
            {
                filters: { nombre: dto.nombre, url: dto.url, rol: dto.rol, currentId: excludeId },
                message: "Ya existe un registro con el mismo nombre, URL y rol"
            },
            {
                filters: { nombre: dto.nombre, rol: dto.rol, currentId: excludeId },
                message: "Ya existe un registro con el mismo nombre y rol"
            },
            {
                filters: { url: dto.url, currentId: excludeId },
                message: "Ya existe un registro con la misma URL"
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
