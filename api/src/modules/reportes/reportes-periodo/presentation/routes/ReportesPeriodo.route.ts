import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesPeriodoDto } from "../../application/dto/ReportesPeriodo.dto";
import { ReportesPeriodoController } from "../controllers/ReportesPeriodo.controller";

export const getListarReportesPeriodo = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesPeriodoController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveReportePeriodo = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ReportesPeriodoController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(ReportesPeriodoDto, req),
});
