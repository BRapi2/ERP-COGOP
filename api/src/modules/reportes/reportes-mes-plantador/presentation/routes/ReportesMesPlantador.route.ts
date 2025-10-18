import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ReportesMesPlantadorDto } from "../../application/dto/ReportesMesPlantador.dto";
import { ReportesMesPlantadorController } from "../controllers/ReportesMesPlantador.controller";

export const getListarReportesMesPlantador = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesMesPlantadorController).list(req.validatedQuery, jwt?.data),
    {
        validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    }
);

export const saveReporteMesPlantador = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesMesPlantadorController).save(req, jwt?.data),
    {
        validateFn: (req) => validateBodyMiddleware(ReportesMesPlantadorDto, req),
    }
);

export const getReporteMesPlantadorById = createAuthHandler(
    (req, ctx, jwt) =>
        container.resolve(ReportesMesPlantadorController).listById(Number(req.params.id)),
    {
    }
);
