// src/modules/contador/tipo-proveedor/infrastructure/repositories/tipo-proveedor.repository.ts
import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError } from '../../../../../errors/custom.errors';
import { ITipoProveedorRepository } from '../../domain/repositories/ITipoProveedor.repository';
import { TipoProveedorModel } from '../model/TipoProveedor.model';
import { TipoProveedor } from '../../domain/entities/TipoProveedor.entity';
import { TipoProveedorMapping } from '../persistence/TipoProveedor.mapping';

@injectable()
export class TipoProveedorRepository implements ITipoProveedorRepository {
    private readonly ormRepository: Repository<TipoProveedorModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(TipoProveedorModel);
    }

    async findAll(): Promise<TipoProveedor[]> {
        const find = await this.ormRepository.find();
        return find.map(TipoProveedorMapping.toEntity);
    }


    async findAndCount(options: FindManyOptions<TipoProveedor>): Promise<[TipoProveedor[], number]> {
        try {
            const modelOptions: FindManyOptions<TipoProveedor> = { ...options };
            const [models, count] = await this.ormRepository.findAndCount(modelOptions);
            const entities = models.map(TipoProveedorMapping.toEntity);
            return [entities, count];
        } catch (error) {
            throw new DatabaseError('Error al listar tipo de proveedor', error);
        }
    }

    async findById(id: number): Promise<TipoProveedor | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            return model ? TipoProveedorMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar tipo de proveedor por ID', error);
        }
    }

    async findByNombre(nombre: string, excludeId?: number): Promise<TipoProveedor | null> {
        try {
            const whereOptions: any = { nombre };
            if (excludeId) {
                whereOptions.id = Not(excludeId);
            }
            const model = await this.ormRepository.findOne({ where: whereOptions });
            return model ? TipoProveedorMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar tipo de proveedor por nombre', error);
        }
    }

    async save(entity: TipoProveedor): Promise<TipoProveedor> {
        try {
            const model = TipoProveedorMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return TipoProveedorMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar tipo de proveedor', error);
        }
    }
}