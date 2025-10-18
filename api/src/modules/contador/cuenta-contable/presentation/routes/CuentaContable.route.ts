import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { CuentaContableDto } from "../../application/dto/CuentaContable.dto";
import { CuentaContableController } from "../controllers/CuentaContable.controller";

export const getListarCuentasContables = createAuthHandler((req, ctx, jwt) =>
    container.resolve(CuentaContableController).list(req.validatedQuery, jwt?.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveCuentaContable = createAuthHandler((req, ctx, jwt) =>
    container.resolve(CuentaContableController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(CuentaContableDto, req),
});