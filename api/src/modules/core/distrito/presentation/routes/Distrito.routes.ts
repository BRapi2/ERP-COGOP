import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { DistritoDto } from "../../application/dto/Distrito.dto";
import { DistritoController } from "../controllers/Distrito.controller";

export const getListarDistritos = createAuthHandler((req, ctx, jwt) =>
    container.resolve(DistritoController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    requiredRoles: ['Administrador']
});

export const saveDistrito = createAuthHandler((req, ctx, jwt) =>
    container.resolve(DistritoController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(DistritoDto, req),
    requiredRoles: ['Administrador']
});