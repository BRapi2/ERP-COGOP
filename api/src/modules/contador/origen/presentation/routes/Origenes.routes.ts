import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler"; 
import { OrigenDto } from "../../application/dto/origen.dto";
import { OrigenController } from "../controllers/origen.controller";

export const getListarOrigenes = createAuthHandler((req, ctx, jwt) =>
    container.resolve(OrigenController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado Origen'
});


export const addOrigen = createAuthHandler((req, ctx, jwt) =>
    container.resolve(OrigenController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(OrigenDto, req),
    logAction: 'Crear/Actualizar Origen'
});