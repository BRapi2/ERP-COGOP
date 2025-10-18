// src/modules/contador/tipo-documento/infrastructure/repositories/tipo-documento.repository.ts
import { injectable } from 'tsyringe';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { TipoDocumentoModel } from "../model/TipoDocumento.model";
import { TipoDocumento } from "../../domain/entities/TipoDocumento.entity";
import { TipoDocumentoMapping } from "../persistence/TipoDocumento.mapping";
import { AppDataSource2 } from "../../../../../db";
import { DatabaseError } from '../../../../../errors/custom.errors';
import { ITipoDocumentoRepository } from '../../domain/repositories/ITipoDocumento.repository';

@injectable()
export class TipoDocumentoRepository implements ITipoDocumentoRepository {
    private readonly ormRepository: Repository<TipoDocumentoModel>;

    constructor() {
        this.ormRepository = AppDataSource2.getRepository(TipoDocumentoModel);
    }

    async findAll(): Promise<TipoDocumento[]> {
        const find = await this.ormRepository.find();
        return find.map(TipoDocumentoMapping.toEntity);
    }

    async findAndCount(options: FindManyOptions<TipoDocumento> = {}): Promise<[TipoDocumento[], number]> {
        try {
            const [models, count] = await this.ormRepository.findAndCount(options);
            return [models.map(TipoDocumentoMapping.toEntity), count];
        } catch (error) {
            throw new DatabaseError('Error al buscar tipos de documento', error);
        }
    }

    async findById(id: number): Promise<TipoDocumento | null> {
        try {
            const model = await this.ormRepository.findOne({ where: { id } });
            return model ? TipoDocumentoMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar tipo de documento por ID', error);
        }
    }

    async findByName(nombre: string, excludeId?: number): Promise<TipoDocumento | null> {
        try {
            const whereOptions: any = { nombre };
            if (excludeId) {
                whereOptions.id = Not(excludeId);
            }
            const model = await this.ormRepository.findOne({ where: whereOptions });
            return model ? TipoDocumentoMapping.toEntity(model) : null;
        } catch (error) {
            throw new DatabaseError('Error al buscar tipo de documento por nombre', error);
        }
    }

    async save(entity: TipoDocumento): Promise<TipoDocumento> {
        try {
            const model = TipoDocumentoMapping.toModel(entity);
            const savedModel = await this.ormRepository.save(model);
            return TipoDocumentoMapping.toEntity(savedModel);
        } catch (error) {
            throw new DatabaseError('Error al guardar tipo de documento', error);
        }
    }
}