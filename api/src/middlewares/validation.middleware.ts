import { validate as validateBody } from 'class-validator';
import { plainToInstance as plainToInstanceBody } from 'class-transformer';
import { HttpRequest, HttpResponseInit } from '@azure/functions';
import { LogService } from '../utils/log.service';

export async function validateBodyMiddleware<T extends object>(dtoClass: new () => T, req: HttpRequest): Promise<HttpResponseInit | null> {

    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
        LogService.logError("MIDDLEWARE_INVALID_CONTENT_TYPE", "Content-Type debe ser application/json", {
            received: contentType,
            url: req.url
        });

        return {
            status: 415,
            jsonBody: {
                status: "FAIL",
                error_message: "El Content-Type debe ser 'application/json'"
            }
        };
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch (error) {
        LogService.logError("MIDDLEWARE_INVALID_JSON", "Error al parsear JSON", {
            error: error.message,
            rawBody: req.rawBody?.toString()
        });

        return {
            status: 400,
            jsonBody: {
                status: "FAIL",
                error_message: "El cuerpo debe ser un JSON válido"
            }
        };
    }

    if (typeof body !== 'object' || body === null) {
        LogService.logError("MIDDLEWARE_INVALID_BODY_TYPE", "El cuerpo no es un objeto", {
            type: typeof body,
            body
        });

        return {
            status: 400,
            jsonBody: {
                status: "FAIL",
                error_message: "El cuerpo debe ser un objeto JSON válido"
            }
        };
    }

    const dtoInstance = plainToInstanceBody(dtoClass, body);
    const errors = await validateBody(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: false
    });

    if (errors.length > 0) {
        const errorMessages = errors.flatMap(err =>
            err.constraints ? Object.values(err.constraints) : [`Error en propiedad ${err.property}`]
        );
        LogService.logError("MIDDLEWARE_VALIDATION_ERROR", "Errores de validación", {
            errors: errorMessages,
            dto: dtoClass.name
        });

        return {
            status: 422,
            jsonBody: {
                status: "FAIL",
                error_message: "Errores de validación",
                errors: errorMessages
            }
        };
    }

    req.validatedBody = dtoInstance;
    return null;
}