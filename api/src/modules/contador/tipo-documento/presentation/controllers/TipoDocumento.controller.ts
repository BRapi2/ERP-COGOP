// src/modules/contador/tipo-documento/presentation/controllers/tipo-documento.controller.ts
import { injectable, inject } from 'tsyringe';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { BaseController } from "../../../../../controllers/base.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { FindManyOptions, FindOptionsOrder, Like } from 'typeorm';
import { TipoDocumentoService } from '../../application/services/TipoDocumento.service';
import { TipoDocumento } from '../../domain/entities/TipoDocumento.entity';
import { TipoDocumentoDto } from '../../application/dto/TipoDocumento.dto';
import { LogService } from '../../../../../utils/log.service';

@injectable()
export class TipoDocumentoController extends BaseController {
    constructor(
        @inject(TipoDocumentoService) private readonly tipoDocumentoService: TipoDocumentoService
    ) {
        super();
    }

    public async list(query: ListQueryDto, userId?: number): Promise<HttpResponseInit> {
        try {
            const [list, count] = await this.tipoDocumentoService.list({
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
                size: query.all ? count : query.size,
                provincia: await this.tipoDocumentoService.findAll()
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId?: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as TipoDocumentoDto;
            const result = dto.id ? await this.tipoDocumentoService.update(dto.id, dto) : await this.tipoDocumentoService.create(dto);
            await LogService.logSuccess(dto.id ? "ACTUALIZAR_TIPO_DOCUMENTO" : "CREAR_TIPO_DOCUMENTO", "OPERACIÓN EXITOSA", result, userId);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            return this.handleError(error);
        }
    }
}