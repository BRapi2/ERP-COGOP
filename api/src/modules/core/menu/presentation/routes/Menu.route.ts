import { container } from "../../../../../dependencias/Container";
import { MenuController } from "../controllers/Menu.controller";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { MenuDto } from "../../application/dto/Menu.dto";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";


export const getListarMenus = createAuthHandler((req, ctx, jwt) => container.resolve(MenuController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado de Menús'
});

export const addMenu = createAuthHandler((req, ctx, jwt) => container.resolve(MenuController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(MenuDto, req),
    logAction: 'Creación/Actualización de Menú'
});
