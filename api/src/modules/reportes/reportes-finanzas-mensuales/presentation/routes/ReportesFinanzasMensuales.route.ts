import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesFinanzasMensualesDto } from "../../application/dto/ReportesFinanzasMensuales.dto";
import { ReportesFinanzasMensualesController } from "../controllers/ReportesFinanzasMensuales.controller";

export const getListarReportesFinanzasMensuales = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesFinanzasMensualesController).list(req.validatedQuery, jwt?.data),
    {
        validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    }
);

export const saveReporteFinanzasMensuales = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesFinanzasMensualesController).save(req, jwt?.data),
    {
        validateFn: (req) => validateBodyMiddleware(ReportesFinanzasMensualesDto, req),
    }
);

export const getReporteFinanzasMensualesById = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesFinanzasMensualesController).listById(Number(req.params.id)),
    {
    }
);
