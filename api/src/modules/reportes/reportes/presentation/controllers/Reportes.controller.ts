import { FindManyOptions, Like, FindOptionsOrder, FindOptionsWhere } from "typeorm";
import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { parseSort } from "../../../../../utils/query.parser";
import { injectable, inject } from "tsyringe";
import { LogService } from "../../../../../utils/log.service";
import { ConflictError, NotFoundError } from "../../../../../errors/custom.errors";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { BaseController } from "../../../../../controllers/base.controller";
import { ReportesService } from "../../application/services/Reportes.service";
import { ReportesDto } from "../../application/dto/Reportes.dto";
import { IglesiaService } from "../../../../core/iglesia/application/services/Iglesia.service";
import { ReportesTipoService } from "../../../reportes-tipo/application/services/ReportesTipo.service";
import { ReportesPeriodoDescripcionService } from "../../../reportes-periodo-descripcion/application/services/ReportesPeriodoDescripcion.service";
import { ReportesPeriodoService } from "../../../reportes-periodo/application/services/ReportesPeriodo.service";
import { ReportesEstadoService } from "../../../reportes-estado/application/services/ReportesEstado.service";
import { ListQueryReportesDto } from "../../application/dto/listQueryReportes.dto";
import { ReportesModel } from "../../infraestructure/model/reportes.models";
import { ReportesEntity } from "../../domain/entities/reportes.entity";

@injectable()
export class ReportesController extends BaseController {

    constructor(
        @inject(ReportesService) private service: ReportesService,
        @inject(IglesiaService) private iglesiaService: IglesiaService,
        @inject(ReportesTipoService) private tipoService: ReportesTipoService,
        @inject(ReportesPeriodoService) private periodoService: ReportesPeriodoService,
        @inject(ReportesPeriodoDescripcionService) private periodoDescripcionService: ReportesPeriodoDescripcionService,
        @inject(ReportesEstadoService) private reportesEstadoService: ReportesEstadoService
    ) { super(); }

    public async list(
        iglesiaId: number,
        query: ListQueryReportesDto,
    ): Promise<HttpResponseInit> {
        try {
            const { page = 0, size = 10, all, sort, year, tipoReporte, estado, periodo } = query;

            const where: FindOptionsWhere<ReportesModel>[] = [];

            const filters: FindOptionsWhere<ReportesModel> = {
                iglesia: { id: iglesiaId }
            };

            if (year) filters.year = year;
            if (tipoReporte) filters.reportesTipo = { id: tipoReporte };
            if (estado) filters.reportesEstado = { id: estado };
            if (periodo) filters.reportesPeriodoDescripcion = { id: periodo };

            where.push(filters);

            // --- Orden ---
            const defaultSort: FindOptionsOrder<ReportesModel> = { id: 'ASC' };
            const order = parseSort<ReportesModel>(sort, ['id'], defaultSort);

            // --- Opciones de consulta ---
            const findOptions: FindManyOptions<ReportesModel> = { where, order };

            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            // --- Ejecutar consulta ---
            const [reportes, count] = await this.service.list(findOptions);

            // --- Preparar payload ---
            const responsePayload = {
                content: reportes,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                iglesia: await this.iglesiaService.listAll(),
                reportesTipo: await this.tipoService.listAll(),
                tipoPeriodo: await this.periodoService.findAll(),
                reportesPeriodoDescripcion: await this.periodoDescripcionService.listAll(),
                reportesEstado: await this.reportesEstadoService.findAll(),
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async listByIglesiaId(
        iglesiaId: number,
        query: ListQueryReportesDto,
    ): Promise<HttpResponseInit> {
        try {
            const { page = 0, size = 10, all, sort, search } = query;
            const where: FindOptionsWhere<ReportesModel>[] = [];

            let yearValue: number | undefined;
            let periodoId: number | undefined;
            let tipoReporteId: number | undefined;
            let estadoId: number | undefined;

            // --- Parsear search ---
            if (search) {
                search.split(' ').forEach(term => {
                    if (term.startsWith('year:')) yearValue = parseInt(term.split(':')[1]);
                    else if (term.startsWith('periodo:')) periodoId = parseInt(term.split(':')[1]);
                    else if (term.startsWith('tipoReporte:')) tipoReporteId = parseInt(term.split(':')[1]);
                    else if (term.startsWith('estado:')) estadoId = parseInt(term.split(':')[1]);
                });
            }

            // --- Filtro base obligatorio: iglesia ---
            const baseFilter: FindOptionsWhere<ReportesModel> = {
                iglesia: { id: iglesiaId }
            };

            // --- Añadir filtros adicionales ---
            if (yearValue) baseFilter.year = yearValue;
            if (periodoId) baseFilter.reportesPeriodoDescripcion = { id: periodoId };
            if (tipoReporteId) baseFilter.reportesTipo = { id: tipoReporteId };
            if (estadoId) baseFilter.reportesEstado = { id: estadoId };

            where.push(baseFilter);

            // --- Orden ---
            const defaultSort: FindOptionsOrder<ReportesModel> = { id: 'ASC' };
            const order = parseSort<ReportesModel>(sort, ['id'], defaultSort);

            // --- Opciones de consulta ---
            const findOptions: FindManyOptions<ReportesModel> = { where, order };
            if (!all) {
                findOptions.take = size;
                findOptions.skip = page * size;
            }

            // --- Ejecutar consulta ---
            const [reportes, count] = await this.service.list(findOptions);

            // --- Preparar payload ---
            const responsePayload = {
                content: reportes,
                totalElements: count,
                totalPages: all ? 1 : Math.ceil(count / size),
                number: page,
                size: all ? count : size,
                iglesia: await this.iglesiaService.listAll(),
                reportesTipo: await this.tipoService.listAll(),
                tipoPeriodo: await this.periodoService.findAll(),
                reportesPeriodoDescripcion: await this.periodoDescripcionService.listAll(),
                reportesEstado: await this.reportesEstadoService.findAll(),
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }


    public async listById(id: number): Promise<HttpResponseInit> {
        try {
            const reporte = await this.service.getById(id);

            if (!reporte) {
                return this.handleError(
                    new Error(`Reporte con id ${id} no encontrado.`),
                    404
                );
            }

            const responsePayload = {
                content: reporte,
                iglesia: await this.iglesiaService.listAll(),
                reportesTipo: await this.tipoService.listAll(),
                tipoPeriodo: await this.periodoService.findAll(),
                reportesPeriodoDescripcion: await this.periodoDescripcionService.listAll(),
                reportesEstado: await this.reportesEstadoService.findAll()
            };

            return this.handleSuccess(responsePayload);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async save(req: HttpRequest, userId: number): Promise<HttpResponseInit> {
        try {
            const dto = req.validatedBody as ReportesDto;
            const result = dto.id
                ? await this.service.update(dto.id, dto)
                : await this.service.create(dto);
            await LogService.logSuccess(
                !dto.id ? "CREAR_REPORTE" : "ACTUALIZAR_REPORTE",
                "Operación exitosa",
                result,
                userId
            );
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
}
