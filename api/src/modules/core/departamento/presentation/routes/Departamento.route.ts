import { container } from "../../../../../dependencias/Container";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";
import { DepartamentoDto } from "../../application/dto/Departamento.dto";
import { DepartamentoController } from "../controllers/Departamento.controller";

export const getListarDepartamentos = createAuthHandler((req, ctx, jwt) =>
    container.resolve(DepartamentoController).list(req.validatedQuery), { 
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    requiredRoles: ['Administrador']
    // logAction: 'Listado Departamentos' // Optional
});

export const saveDepartamento = createAuthHandler((req, ctx, jwt) =>
    container.resolve(DepartamentoController).save(req, jwt?.data), {
    validateFn: (req) => validateBodyMiddleware(DepartamentoDto, req),
    requiredRoles: ['Administrador']
    // logAction: 'Crear/Actualizar Departamento' // Optional
});