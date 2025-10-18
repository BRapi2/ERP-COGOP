import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { YearMesDto } from "../../application/dto/YearMes.dto";
import { YearMesController } from "../controllers/YearMes.controller";

export const getListarYearMes = createAuthHandler((req, ctx, jwt) =>
    container.resolve(YearMesController).list(req.validatedQuery, jwt?.data), { 
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    // logAction: 'Listado Año' // Optional
});

export const saveYearMes = createAuthHandler((req, ctx, jwt) =>
    container.resolve(YearMesController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(YearMesDto, req),
    // logAction: 'Crear/Actualizar Año' // Optional
});