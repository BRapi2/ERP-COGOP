import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { withJwtAuth, AuthenticatedController } from "./auth.handler";
import { BaseController } from "../controllers/base.controller";
import fs from "fs";

const token = fs.readFileSync("jwtRS256.key");
interface MyJwtPayload { data: number, role: any }

export type ValidationFunction = (req: HttpRequest) => Promise<HttpResponseInit | null>;

export const createAuthHandler = (
    handler: AuthenticatedController,
    options?: {
        validateFn?: ValidationFunction;
        requiredRoles?: string[];
        logAction?: string;
    }
) => {
    return async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        if (!token) {
            context.error("CRITICAL: JWT Key no configurado");
            return BaseController.createInternalServerError("Error de configuración del servidor [JWT Key Missing]");
        }

        if (options?.validateFn) {
            const validationError = await options.validateFn(req);
            if (validationError) return validationError;
        }

        return withJwtAuth<MyJwtPayload>(
            async (req, ctx, jwt) => {
                if (options?.requiredRoles && !options.requiredRoles.includes(jwt.role)) {
                    return BaseController.createForbiddenError("No tiene permisos suficientes");
                }

                if (options?.logAction) {
                    ctx.log(`[${context.invocationId}] ${options.logAction} - ${JSON.stringify({
                        user: jwt.data,
                        details: new Date().toISOString()})}`);
                }

                return handler(req, ctx, jwt);
            },
            token,
            'CustomToken',
            ''
        )(req, context);
    };
};