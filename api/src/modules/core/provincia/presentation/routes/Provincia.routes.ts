import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ProvinciaDto } from "../../application/dto/Provincia.dto";
import { ProvinciaController } from "../controllers/Provincia.controller";

export const getListarProvincias = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ProvinciaController).list(req.validatedQuery), { 
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    requiredRoles: ['Administrador']
});

export const saveProvincia = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ProvinciaController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(ProvinciaDto, req),
    requiredRoles: ['Administrador']
});