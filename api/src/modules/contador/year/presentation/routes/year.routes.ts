import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { YearDto } from "../../application/dto/year.dto";
import { YearController } from "../controllers/year.controller";

export const getListarYear = createAuthHandler((req, ctx, jwt) =>
    container.resolve(YearController).list(req.validatedQuery, jwt?.data), { 
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    // logAction: 'Listado Año' // Optional
});

export const saveYear = createAuthHandler((req, ctx, jwt) =>
    container.resolve(YearController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(YearDto, req),
    // logAction: 'Crear/Actualizar Año' // Optional
});