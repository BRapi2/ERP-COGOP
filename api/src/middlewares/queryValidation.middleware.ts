import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { LogService } from '../utils/log.service'; // Asumiendo que tienes un servicio de logs

export async function validateQueryMiddleware<T extends object>(dtoClass: new () => T, req: HttpRequest): Promise<HttpResponseInit | null> {
    try {
        const queryParams = Object.fromEntries(req.query.entries());

        const dtoInstance = plainToInstance(dtoClass, queryParams, {
            enableImplicitConversion: true
        });

        const errors = await validate(dtoInstance, {
            whitelist: true,
            forbidNonWhitelisted: true,
            stopAtFirstError: false,
            validationError: { target: false }
        });

        if (errors.length > 0) {
            const errorMessages = errors.flatMap(err =>
                err.constraints
                    ? Object.values(err.constraints)
                    : [`${err.property}: Error de validación`]
            );

            LogService.logWarning('MIDDLEWARE', 'INVALID_QUERY_PARAMS', { errors: errorMessages, receivedParams: queryParams, path: req.url });

            return {
                status: 400,
                jsonBody: {
                    status: "FAIL",
                    error: "Parámetros de consulta inválidos",
                    details: errorMessages,
                    code: "VALIDATION_ERROR"
                }
            };
        }

        req.validatedQuery = dtoInstance;
        return null;

    } catch (error) {
        LogService.logError('QUERY_VALIDATION_EXCEPTION', error.message, {
            stack: error.stack,
            url: req.url
        });

        return {
            status: 500,
            jsonBody: {
                status: "ERROR",
                error: "Error interno al validar parámetros",
                code: "INTERNAL_VALIDATION_ERROR"
            }
        };
    }
}