import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { MonedaDto } from "../../application/dto/Moneda.dto";
import { container } from "../../../../../dependencias/Container";
import { MonedaController } from "../controllers/Moneda.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";

// para agregar los permiso se necesita requiredRoles: ['EDITOR', 'ADMIN'],
export const getListarMonedas = createAuthHandler(
    (req, ctx, jwt) => container.resolve(MonedaController).list(req.validatedQuery, jwt.data),
    {
        validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
        logAction: 'Listado de monedas'
    }
);

export const addMonedas = createAuthHandler(
    (req, ctx, jwt) => container.resolve(MonedaController).save(req, jwt.data),
    {
        validateFn: (req) => validateBodyMiddleware(MonedaDto, req),
        logAction: 'Creación/Actualización de moneda'
    }
);