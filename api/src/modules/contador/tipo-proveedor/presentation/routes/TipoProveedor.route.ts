// src/modules/contador/tipo-proveedor/presentation/handlers/tipo-proveedor.handler.ts
import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { TipoProveedorDto } from "../../application/dto/TipoProveedor.dto";
import { TipoProveedorController } from "../controllers/TipoProveedor.controller";

export const getListarTipoProveedor = createAuthHandler((req, ctx, jwt) =>
    container.resolve(TipoProveedorController).list(req.validatedQuery, jwt?.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveTipoProveedor = createAuthHandler((req, ctx, jwt) =>
    container.resolve(TipoProveedorController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(TipoProveedorDto, req),
});