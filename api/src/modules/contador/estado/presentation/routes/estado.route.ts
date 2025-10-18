
import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { EstadoDto } from "../../application/dto/Estado.dto";
import { EstadoController } from "../controllers/Estado.controller";

export const getListarEstados = createAuthHandler((req, ctx) =>
    container.resolve(EstadoController).list(req.validatedQuery), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req)
});

export const saveEstado = createAuthHandler((req, ctx) =>
    container.resolve(EstadoController).save(req), {
    validateFn: (req) => validateBodyMiddleware(EstadoDto, req)
});