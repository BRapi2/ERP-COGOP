import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { LogService } from "./log.service";
import jwt from 'jsonwebtoken';
import { BaseController } from "../controllers/base.controller";

export type AuthenticatedController<TPayload = any> =
    (req: HttpRequest, context: InvocationContext, jwtPayload: TPayload) => Promise<HttpResponseInit>;

export function withJwtAuth<TPayload = any>(handler: AuthenticatedController<TPayload>, jwtKeyOrSecret: string | Buffer, tokenHeaderName: string = 'CustomToken', tokenPrefix: string = ''): (req: HttpRequest, context: InvocationContext) => Promise<HttpResponseInit> {
    return async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
        const operation = "JWT_VERIFICATION_FAILURE";
        if (!jwtKeyOrSecret) {
            context.error("CRITICAL: Clave/Secreto JWT no configurado en el servidor.");
            await LogService.logError(operation, `Error de configuración interna del servidor [JWT Key/Secret Missing]`, [`ruta: ${req.url}`]);
            return BaseController.createInternalServerError("Error de configuración interna del servidor [JWT Key/Secret Missing]")
        }
        const authHeaderValue = req.headers.get(tokenHeaderName);

        if (!authHeaderValue) {
            await LogService.logError(operation, `Encabezado no proporcionado.`, [`ruta: ${req.url}`]);
            return BaseController.createInternalServerError("Encabezado no proporcionado.")
        }
        let token: string;
        if (tokenPrefix && tokenPrefix.trim().length > 0) {
            if (authHeaderValue.startsWith(tokenPrefix)) {
                token = authHeaderValue.substring(tokenPrefix.length);
            } else {
                context.warn(`Encabezado con formato incorrecto. Esperado prefijo.`);
                await LogService.logError(operation, `Formato de token inválido (prefijo esperado no encontrado).`, [`ruta: ${req.url}`]);
                return BaseController.createInternalServerError("Formato de token inválido (prefijo esperado no encontrado).")
            }
        } else {
            token = authHeaderValue;
        }
        token = token.trim();
        if (!token) {
            await LogService.logError(operation, `Token no proporcionado o vacío.`, [`ruta: ${req.url}`]);
            return BaseController.createInternalServerError("Token no proporcionado o vacío.")
        }
        let verifiedPayload: TPayload;
        try {
            verifiedPayload = jwt.verify(token, jwtKeyOrSecret, { algorithms: ['RS256'] }) as TPayload;
        } catch (error) {
            context.error(`Error de verificación de JWT (RS256) desde encabezado:`, error.message || error);
            if (error.name === 'JsonWebTokenError') {
                await LogService.logError(operation, `Token inválido o firma incorrecta.`, [`ruta: ${req.url}`]);
                return BaseController.createInternalServerError("Token inválido o firma incorrecta.")
            } else if (error.name === 'TokenExpiredError') {
                await LogService.logError(operation, `Token expirado.`, [`ruta: ${req.url}`]);
                return BaseController.createInternalServerError("Token expirado.")
            }
            await LogService.logError(operation, `Fallo en la autenticación del token.`, [`ruta: ${req.url}`]);
            return BaseController.createInternalServerError("Fallo en la autenticación del token.")
        }
        try {
            return await handler(req, context, verifiedPayload);
        } catch (handlerError) {
            context.error(`Error en el controlador después de la autenticación JWT (ruta: ${req.url}):`, handlerError);
            const clientErrorMessage = handlerError instanceof Error ? handlerError.message : "Ocurrió un error interno al procesar su solicitud.";
            await LogService.logError(operation, clientErrorMessage, [`ruta: ${req.url}`]);
            return BaseController.createInternalServerError(clientErrorMessage)
        }
    };
}