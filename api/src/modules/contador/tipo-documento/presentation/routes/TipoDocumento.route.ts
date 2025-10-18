import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { TipoDocumentoDto } from "../../application/dto/TipoDocumento.dto";
import { TipoDocumentoController } from "../controllers/TipoDocumento.controller";

export const getListarTipoDocumento = createAuthHandler((req, ctx, jwt) =>
    container.resolve(TipoDocumentoController).list(req.validatedQuery, jwt?.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveTipoDocumento = createAuthHandler((req, ctx, jwt) =>
    container.resolve(TipoDocumentoController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(TipoDocumentoDto, req),
});