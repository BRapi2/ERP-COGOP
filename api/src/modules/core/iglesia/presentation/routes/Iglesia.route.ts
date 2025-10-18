import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { IglesiaDto } from "../../application/dto/Iglesia.dto";
import { IglesiaController } from "../controllers/Iglesia.controller";

export const getListarIglesia = createAuthHandler((req, ctx, jwt) =>
    container.resolve(IglesiaController).list(req.validatedQuery, jwt?.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    requiredRoles: ['Administrador'],
    // logAction: 'Listado Iglesias' // Optional
});

export const saveIglesia = createAuthHandler((req, ctx, jwt) =>
    container.resolve(IglesiaController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(IglesiaDto, req),
    requiredRoles: ['Administrador'],
    // logAction: 'Crear/Actualizar Iglesia' // Optional
});
