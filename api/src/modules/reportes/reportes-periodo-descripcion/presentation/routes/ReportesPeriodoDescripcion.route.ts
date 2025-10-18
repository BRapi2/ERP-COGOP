import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesPeriodoDescripcionDto } from "../../application/dto/ReportesPeriodoDescripcion.dto";
import { ReportesPeriodoDescripcionController } from "../controllers/ReportesPeriodoDescripcion.controller";

export const getListarReportesPeriodoDescripcion = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesPeriodoDescripcionController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    // logAction: 'Listado ReportesPeriodoDescripcion' // Optional
});

export const saveReportesPeriodoDescripcion = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesPeriodoDescripcionController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(ReportesPeriodoDescripcionDto, req),
    // logAction: 'Crear/Actualizar ReportesPeriodoDescripcion' // Optional
});
