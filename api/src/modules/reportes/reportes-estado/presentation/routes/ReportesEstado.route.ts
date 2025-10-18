import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesEstadoDto } from "../../application/dto/ReportesEstado.dto";
import { ReportesEstadoController } from "../controllers/ReportesEstado.controller";

export const getListarReportesEstado = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesEstadoController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveReporteEstado = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesEstadoController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(ReportesEstadoDto, req),
});
