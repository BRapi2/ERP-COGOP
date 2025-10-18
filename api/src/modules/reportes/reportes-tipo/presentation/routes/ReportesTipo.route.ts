import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesTipoDto } from "../../application/dto/ReportesTipo.dto";
import { ReportesTipoController } from "../controllers/ReportesTipo.controller";

export const getListarReportesTipo = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesTipoController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    // logAction: 'Listado ReportesTipo'
});

export const saveReportesTipo = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesTipoController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(ReportesTipoDto, req),
    // logAction: 'Crear/Actualizar ReportesTipo'
});
