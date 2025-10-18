import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { UserDto } from "../../application/dto/User.dto";
import { UserController } from "../controllers/User.controller";

export const getListarUsuarios = createAuthHandler((req, ctx, jwt) =>
    container.resolve(UserController).list(req.validatedQuery, jwt?.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveUsuario = createAuthHandler((req, ctx, jwt) =>
    container.resolve(UserController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(UserDto, req),
    // logAction: 'Crear/Actualizar Usuario' // Optional
});

export const getListarId = createAuthHandler((req, ctx, jwt) =>
    container.resolve(UserController).findById(req, jwt?.data), {
    //validateFn: (req) => validateBodyMiddleware(UserDto, req),
    // logAction: 'Crear/Actualizar Usuario' // Optional
});