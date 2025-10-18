import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesTipoEncargadoDto } from "../../../reportes_tipo_encargado/application/dto/ReportesTipoEncargado.dto";
import { ReportesTipoEncargadoController } from "../../../reportes_tipo_encargado/presentation/controllers/ReportesTipoEncargado.controller";

export const getListarReportesTipoEncargado = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesTipoEncargadoController).list(req.validatedQuery),
    {
        validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
        // logAction: 'Listado ReportesTipoEncargado' // Optional
    }
);

export const saveReportesTipoEncargado = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesTipoEncargadoController).save(req, jwt?.data),
    {
        validateFn: (req) => validateBodyMiddleware(ReportesTipoEncargadoDto, req),
        // logAction: 'Crear/Actualizar ReportesTipoEncargado' // Optional
    }
);
