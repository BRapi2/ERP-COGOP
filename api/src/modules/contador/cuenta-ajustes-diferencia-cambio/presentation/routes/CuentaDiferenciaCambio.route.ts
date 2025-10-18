import { container } from "../../../../../dependencias/Container";
import { CuentaAjusteController } from "../controllers/CuentaAjuste.controller";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { CuentaAjusteDto } from "../../application/dto/CuentaAjuste.dto";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";


export const getListarCuentaDiferenciaCambio = createAuthHandler((req, ctx, jwt) => container.resolve(CuentaAjusteController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado Cuenta Diferencia de Cambio'
});

export const addCuentaDiferenciaCambio = createAuthHandler((req, ctx, jwt) => container.resolve(CuentaAjusteController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(CuentaAjusteDto, req),
    logAction: 'Creación/Actualización de Cuenta Diferencia de Cambio'
});