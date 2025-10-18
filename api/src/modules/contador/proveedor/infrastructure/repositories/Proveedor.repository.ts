// src/modules/contador/proveedor/infrastructure/repositories/proveedor.repository.ts
import { injectable } from 'tsyringe';
import { FindManyOptions, Repository } from 'typeorm';
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError } from '../../../../../errors/custom.errors';
import { IProveedorRepository } from '../../domain/repositories/iproveedor.repository';
import { ProveedorModel } from '../model/Proveedor.model';
import { ProveedorEntity } from '../../domain/entities/Proveedor.entity';
import { ProveedorMapping } from '../persistence/Proveedor.mapping';

@injectable()
export class ProveedorRepository implements IProveedorRepository {
    private readonly ormRepository: Repository<ProveedorModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(ProveedorModel);
    }

    async findByNombre(nombre: string): Promise<ProveedorEntity | null> {
        try {
            const model = await this.ormRepository.findOne({ 
                where: { nombre },
                relations: ['tipoProveedor', 'tipoDocumento']
            });
            return model ? ProveedorMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar proveedor por RUC', error);
        }
    }

    async findAll(): Promise<ProveedorEntity[]> {
        const models = await this.ormRepository.find({ 
            relations: ['tipoProveedor', 'tipoDocumento'] 
        });
        return models.map(ProveedorMapping.toEntity);
    }

    async findAndCount(options: FindManyOptions<ProveedorEntity> = {}): Promise<[ProveedorEntity[], number]> {
        try {
            const fullOptions: FindManyOptions<ProveedorModel> = {
                ...options,
                relations: ['tipoProveedor', 'tipoDocumento']
            };
            const [models, count] = await this.ormRepository.findAndCount(fullOptions);
            return [models.map(ProveedorMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError('Error al buscar proveedores', error);
        }
    }

    async findById(id: number): Promise<ProveedorEntity | null> {
        try {
            const model = await this.ormRepository.findOne({ 
                where: { id },
                relations: ['tipoProveedor', 'tipoDocumento']
            });
            return model ? ProveedorMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar proveedor por ID', error);
        }
    }

    async findByRuc(ruc: string): Promise<ProveedorEntity | null> {
        try {
            const model = await this.ormRepository.findOne({ 
                where: { ruc },
                relations: ['tipoProveedor', 'tipoDocumento']
            });
            return model ? ProveedorMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar proveedor por RUC', error);
        }
    }

    async save(entity: ProveedorEntity): Promise<ProveedorEntity> {
        try {
            const model = ProveedorMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return ProveedorMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar proveedor', error);
        }
    }
}