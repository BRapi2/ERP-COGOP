import { container } from "../../../../../dependencias/Container";
import { ReportesController } from "../controllers/Reportes.controller";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { ReportesDto } from "../../application/dto/Reportes.dto";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";

export const getListarReportes = createAuthHandler((req, ctx, jwt) => container.resolve(ReportesController).list(Number(req.params.id), req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado de Reportes'
}
);

export const addReportes = createAuthHandler((req, ctx, jwt) => container.resolve(ReportesController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(ReportesDto, req),
    logAction: 'Creación/Actualización de Reporte'
}
);

export const getReporteById = createAuthHandler((req, ctx, jwt) => container.resolve(ReportesController).listById(Number(req.params.id)), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Obtener Reporte por ID'
}
);

export const getReportesPorIglesia = createAuthHandler((req, ctx, jwt) => container.resolve(ReportesController).listByIglesiaId(Number(req.params.id), req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado de Reportes por Iglesia'
}
);
