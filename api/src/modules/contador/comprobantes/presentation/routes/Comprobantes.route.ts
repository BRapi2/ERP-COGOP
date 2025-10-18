import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { container } from "../../../../../dependencias/Container";
import { TipoComprobanteController } from "../controllers/TipoComprobante.controller";
import { TipoComprobanteDto } from "../../application/dto/TipoComprobante.dto";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";

export const getListarComprobante = createAuthHandler((req, ctx, jwt) => container.resolve(TipoComprobanteController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req), logAction: 'Listado de Comprobantes',requiredRoles: ['Administrador']
});

export const addComprobante = createAuthHandler((req, ctx, jwt) => container.resolve(TipoComprobanteController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(TipoComprobanteDto, req), logAction: 'Creación/Actualización de Tipo de Comprobantes',requiredRoles: ['Administrador']
});
