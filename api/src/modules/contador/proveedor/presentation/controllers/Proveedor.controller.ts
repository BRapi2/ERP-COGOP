// src/modules/contador/proveedor/presentation/controllers/proveedor.controller.ts
import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Like } from 'typeorm';
import { ProveedorService } from '../../application/services/Proveedor.service';
import { TipoProveedorService } from '../../../tipo-proveedor/application/services/TipoProveedor.service';
import { TipoDocumentoService } from '../../../tipo-documento/application/services/TipoDocumento.service';
import { ProveedorEntity } from '../../domain/entities/Proveedor.entity';
import { ProveedorDto } from '../../application/dto/Proveedor.dto';

@injectable()
export class ProveedorController extends BaseController {
    constructor(
        @inject(ProveedorService) private readonly proveedorService: ProveedorService,
        @inject(TipoProveedorService) private readonly tipoProveedorService: TipoProveedorService,
        @inject(TipoDocumentoService) private readonly tipoDocumentoService: TipoDocumentoService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId?: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where: any = search ? { nombre: Like(`%${search}%`) } : {};

            const defaultSortOrder: FindOptionsOrder<ProveedorEntity> = { id: 'ASC' };
            const order = parseSort<ProveedorEntity>(sort, ['id', 'nombre', 'ruc'], defaultSortOrder);

            const findOptions: FindManyOptions<ProveedorEntity> = { where, order };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.proveedorService.list(findOptions);
            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                tiposProveedor: await this.tipoProveedorService.findAll(),
                tiposDocumento: await this.tipoDocumentoService.findAll()
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId?: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as ProveedorDto;
            const result = dto.id
                ? await this.proveedorService.update(dto.id, dto)
                : await this.proveedorService.create(dto);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }
}