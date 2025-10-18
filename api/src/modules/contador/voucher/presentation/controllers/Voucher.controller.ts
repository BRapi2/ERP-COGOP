import { FindManyOptions, Like, FindOptionsOrder, FindOneOptions } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { VoucherDto } from "../../application/dto/voucher.dto";
import { FindOrCreateVoucherDto } from "../../application/dto/find_voucher.dto";
import { parseSort } from '../../../../../utils/query.parser';
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { VoucherService } from "../../application/services/Voucher.service";
import { OrigenService } from "../../../origen/application/services/origen.service";
import { MesService } from "../../../mes/application/services/mes.service";
import { YearService } from "../../../year/application/services/year.service";
import { MonedaService } from "../../../moneda/application/services/Moneda.service";
import { TipoComprobanteService } from "../../../comprobantes/application/services/TipoComprobante.service";
import { BaseController } from "../../../../../controllers/base.controller";
import { UserService } from "../../../../core/user/application/services/User.service";

@injectable()
export class VoucherController extends BaseController {
    constructor(@inject(VoucherService) private service: VoucherService,
        @inject(OrigenService) private origenService: OrigenService,
        @inject(MesService) private mesService: MesService,
        @inject(YearService) private yearService: YearService,
        @inject(MonedaService) private monedaService: MonedaService,
        @inject(UserService) private userService: UserService,
        @inject(TipoComprobanteService) private comprobantesService: TipoComprobanteService) { super(); }

    public async list(query: ListQueryDto, userId: number): Promise<HttpResponseInit> {
        try {
            const { page, size, all, sort, search } = query;
            const where = search
                ? [
                    { origen: Like(`%${search}%`) }
                ]
                : {};
            const defaultSortOrder: FindOptionsOrder<VoucherDto> = { id: 'ASC' };
            const order = parseSort<VoucherDto>(
                sort,
                ['id'],
                defaultSortOrder
            );
            const findOptions: FindManyOptions<VoucherDto> = { where, order };
            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            const [list, count] = await this.service.list(findOptions);

            const responsePayload = {
                content: list,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }
    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as VoucherDto;
            const result = dto.id ? await this.service.update(dto.id, dto) : await this.service.create(dto);
            await LogService.logSuccess(!dto.id ? "CREATE_VOUCHER" : "UPDATE_VOUCHER", "OPERACIÓN EXITOSA", result, userId);
            return this.handleSuccess(result, !dto.id ? 201 : 200);
        } catch (error) {
            if (error instanceof ConflictError) {
                return this.handleError(error, 409);
            }
            if (error instanceof NotFoundError) {
                return this.handleError(error, 404);
            }
            return this.handleError(error);
        }
    }
    public async findOrCreate(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as FindOrCreateVoucherDto;

            const validarOrigen = await this.origenService.getById(dto.origen.id);
            if (!validarOrigen) {
                throw new NotFoundError(`Origen ${dto.origen.id} no encontrado`);
            }
            const validarMes = await this.mesService.getById(dto.mes.id);
            if (!validarMes) {
                throw new NotFoundError(`Mes ${dto.mes.id} no encontrado`);
            }
            const validaryear = await this.yearService.findById(dto.year.id);
            if (!validaryear) {
                throw new NotFoundError(`Año ${dto.year.id} no encontrado`);
            }

            let optionsToFindExisting: FindOneOptions<VoucherDto> = {};
            if (dto.nAsiento) {
                optionsToFindExisting = {
                    where: {
                        origen: { id: dto.origen.id },
                        mes: { id: dto.mes.id },
                        year: { id: dto.year.id },
                        nAsiento: dto.nAsiento
                    },
                    relations: ["origen", "mes", "year", "moneda", "proveedor", "tipoComprobante", "detalles"]
                };
            }

            const optionsToFindLast: FindOneOptions<VoucherDto> = {
                where: {
                    origen: { id: dto.origen.id },
                    mes: { id: dto.mes.id },
                    year: { id: dto.year.id }
                },
                order: { nAsiento: 'DESC' }
            };

            const result = await this.service.findOrCreate(
                optionsToFindExisting,
                optionsToFindLast,
                dto.nAsiento
            );

            return this.handleSuccess(result);

        } catch (error) {
            return this.handleError(error);
        }
    }
    public async settings(jwt: any): Promise<HttpResponseInit> {
        try {
            const user = await this.userService.getById(jwt)
            const [listaDeOrigenes, total] = await this.origenService.list();
            const listaDeMonedas = await this.monedaService.obtenerMonedas()
            const listaDeComprobantes = await this.comprobantesService.obtenerTipoComprobante();
            const responsePayload = {
                origenes: listaDeOrigenes,
                monedas: listaDeMonedas,
                comprobantes: listaDeComprobantes,
                iglesia: user.iglesia.id,
            };
            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }
}
