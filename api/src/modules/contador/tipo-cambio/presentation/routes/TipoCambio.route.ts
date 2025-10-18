import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { TipoCambioDto } from "../../application/dto/TipoCambio.dto";
import { TipoCambioController } from "../controllers/TipoCambio.controller";

export const getListarTipoCambio = createAuthHandler((req, ctx, jwt) => container.resolve(TipoCambioController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado Tipo Cambio'
});

export const addTipoCambio = createAuthHandler((req, ctx, jwt) => container.resolve(TipoCambioController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(TipoCambioDto, req),
    logAction: 'Creación/Actualización de Tipo Cambio'
});