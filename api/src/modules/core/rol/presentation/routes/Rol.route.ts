import { container } from "../../../../../dependencias/Container";
import { RolController } from "../controllers/Rol.controller";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { RolDto } from "../../application/dto/Rol.dto";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";

export const getListarRoles = createAuthHandler(
    (req, ctx, jwt) => container.resolve(RolController).list(req.validatedQuery, jwt.data),
    {
        validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
        logAction: 'Listado de Roles'
    }
);

export const addRol = createAuthHandler(
    (req, ctx, jwt) => container.resolve(RolController).save(req, jwt.data),
    {
        validateFn: (req) => validateBodyMiddleware(RolDto, req),
        logAction: 'Creación/Actualización de Rol'
    }
);
