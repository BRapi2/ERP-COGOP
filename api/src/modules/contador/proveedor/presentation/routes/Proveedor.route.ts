import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { ProveedorDto } from "../../application/dto/Proveedor.dto";
import { ProveedorController } from "../controllers/Proveedor.controller";

export const getListarProveedores = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ProveedorController).list(req.validatedQuery, jwt?.data), { 
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
});

export const saveProveedor = createAuthHandler((req, ctx, jwt) =>
    container.resolve(ProveedorController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(ProveedorDto, req),
});