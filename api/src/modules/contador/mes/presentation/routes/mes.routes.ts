import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { MesDto } from "../../application/dto/mes.dto";
import { MesController } from "../controllers/mes.controller";

export const getListarMes = createAuthHandler((req, ctx, jwt) =>
    container.resolve(MesController).list(req.validatedQuery, jwt?.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveMes = createAuthHandler((req, ctx, jwt) =>
    container.resolve(MesController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(MesDto, req),
});