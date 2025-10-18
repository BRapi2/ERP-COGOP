// src/modules/contador/tipo-proveedor/presentation/controllers/tipo-proveedor.controller.ts
import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Like } from 'typeorm';
import { TipoProveedorService } from '../../application/services/TipoProveedor.service';
import { TipoProveedor } from '../../domain/entities/TipoProveedor.entity';
import { TipoProveedorDto } from '../../application/dto/TipoProveedor.dto';

@injectable()
export class TipoProveedorController extends BaseController {
    constructor(
        @inject(TipoProveedorService) private readonly tipoProveedorService: TipoProveedorService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId?: number): Promise<HttpResponseInit> {
        try {
            const [list, count] = await this.tipoProveedorService.list({
                where: query.search ? { nombre: Like(`%${query.search}%`) } : {},
                order: parseSort<any>(query.sort, ['id', 'nombre'], { nombre: 'ASC' }),
                take: query.all ? undefined : query.size,
                skip: query.all ? undefined : query.page * query.size
            });

            return this.handleSuccess({
                content: list,
                totalElements: count,
                totalPages: query.all ? 1 : Math.ceil(count / query.size),
                number: query.page,
                size: query.all ? count : query.size
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId?: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as TipoProveedorDto;
            const result = dto.id
                ? await this.tipoProveedorService.update(dto.id, dto)
                : await this.tipoProveedorService.create(dto);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }
}