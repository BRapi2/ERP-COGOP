import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { TipoCambioCierreDto } from "../../application/dto/TipoCambioCierre.dto";
import { TipoCambioCierreController } from "../controllers/TipoCambioCierre.controller";

export const getListarTipoCambioCierre = createAuthHandler((req, ctx, jwt) =>
    container.resolve(TipoCambioCierreController).list(req.validatedQuery, jwt?.data), { 
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req)
});

export const saveTipoCambioCierre = createAuthHandler((req, ctx, jwt) =>
    container.resolve(TipoCambioCierreController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(TipoCambioCierreDto, req)
});