import { CentroCostoController } from "../controllers/CentroCosto.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { CentroCostoDto } from "../../application/dto/CentroCosto.dto";
import { container } from "../../../../../dependencias/Container";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";


export const getListarCentroCostos = createAuthHandler((req, ctx, jwt) => container.resolve(CentroCostoController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado de Centro Costo'
});

export const addCentroCostos = createAuthHandler((req, ctx, jwt) => container.resolve(CentroCostoController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(CentroCostoDto, req),
    logAction: 'Creación/Actualización de Centro Costo'
});
