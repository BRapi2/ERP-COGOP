import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { PerfilDto } from "../../application/dto/Perfil.dto";
import { PerfilController } from "../controllers/Perfil.controller";

export const getListarPerfiles = createAuthHandler((req, ctx, jwt) =>
    container.resolve(PerfilController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    // logAction: 'Listado Perfiles' // Opcional
});

export const savePerfil = createAuthHandler((req, ctx, jwt) =>
    container.resolve(PerfilController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(PerfilDto, req),
    // logAction: 'Crear/Actualizar Perfil' // Opcional
});