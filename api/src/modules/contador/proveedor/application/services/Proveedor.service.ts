// src/modules/contador/proveedor/application/services/proveedor.service.ts
import { injectable, inject } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import { IProveedorRepository } from '../../domain/repositories/iproveedor.repository';
import { ConflictError, NotFoundError, ValidationError, DatabaseError } from '../../../../../errors/custom.errors';
import { Transactional } from '../../../../../utils/transaction.decorator';
import { validateOrReject } from 'class-validator';
import { ITipoProveedorRepository } from '../../../tipo-proveedor/domain/repositories/ITipoProveedor.repository';
import { ITipoDocumentoRepository } from '../../../tipo-documento/domain/repositories/ITipoDocumento.repository';
import { ProveedorEntity } from '../../domain/entities/Proveedor.entity';
import { ProveedorDto } from '../dto/Proveedor.dto';

@injectable()
export class ProveedorService {
    constructor(
        @inject('IProveedorRepository') private readonly repository: IProveedorRepository,
        @inject('ITipoProveedorRepository') private readonly tipoProveedorRepository: ITipoProveedorRepository,
        @inject('ITipoDocumentoRepository') private readonly tipoDocumentoRepository: ITipoDocumentoRepository
    ) { }

    @Transactional("READ COMMITTED")
    public findAll(): Promise<ProveedorEntity[]> {
        return this.repository.findAll();
    }

    @Transactional("READ COMMITTED")
    async list(options: FindManyOptions<ProveedorEntity> = {}): Promise<[ProveedorEntity[], number]> {
        try {
            return await this.repository.findAndCount(options);
        } catch (error) {
            throw new DatabaseError('Error al listar proveedores', error);
        }
    }

    @Transactional("SERIALIZABLE")
    async create(dto: ProveedorDto): Promise<ProveedorEntity> {
        await this.validateDto(dto);
        await this.validateUniqueRuc(dto.ruc);
        await this.validateUniqueNombre(dto.nombre);
        await this.validateTipoProveedorExists(dto.tipoProveedor.id);
        await this.validateTipoDocumentoExists(dto.tipoDocumento.id);

        const newEntity = ProveedorEntity.crear(dto);
        return this.repository.save(newEntity);
    }

    @Transactional("SERIALIZABLE")
    async update(id: number, dto: ProveedorDto): Promise<ProveedorEntity> {
        await this.validateDto(dto);
        const existing = await this.repository.findById(id);
        
        if (dto.ruc !== existing.ruc) {
            await this.validateUniqueRuc(dto.ruc, id);
        }
        if (dto.nombre !== existing.nombre) {
            await this.validateUniqueNombre(dto.nombre, id);
        }
        
        if (dto.tipoProveedor.id !== existing.tipoProveedor.id) {
            await this.validateTipoProveedorExists(dto.tipoProveedor.id);
        }
        
        if (dto.tipoDocumento.id !== existing.tipoDocumento.id) {
            await this.validateTipoDocumentoExists(dto.tipoDocumento.id);
        }

        const updatedEntity = ProveedorEntity.crear({ ...existing, ...dto, id });
        return this.repository.save(updatedEntity);
    }

    private async validateDto(dto: ProveedorDto): Promise<void> {
        try {
            await validateOrReject(dto);
        } catch (error) {
            if (error instanceof Array && error[0]?.constraints) {
                throw new ValidationError('Error de validación', error);
            }
            throw error;
        }
    }

    private async validateUniqueRuc(ruc: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByRuc(ruc);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un proveedor con el Tipo Documento '${ruc}'`);
        }
    }
    private async validateUniqueNombre(nombre: string, excludeId?: number): Promise<void> {
        const existing = await this.repository.findByNombre(nombre);
        if (existing && (!excludeId || existing.id !== excludeId)) {
            throw new ConflictError(`Ya existe un proveedor con el Nombre '${nombre}'`);
        }
    }

    private async validateTipoProveedorExists(tipoProveedorId: number): Promise<void> {
        const tipoProveedor = await this.tipoProveedorRepository.findById(tipoProveedorId);
        if (!tipoProveedor) {
            throw new NotFoundError(`Tipo de proveedor con ID ${tipoProveedorId} no encontrado`);
        }
    }

    private async validateTipoDocumentoExists(tipoDocumentoId: number): Promise<void> {
        const tipoDocumento = await this.tipoDocumentoRepository.findById(tipoDocumentoId);
        if (!tipoDocumento) {
            throw new NotFoundError(`Tipo de documento con ID ${tipoDocumentoId} no encontrado`);
        }
    }
}