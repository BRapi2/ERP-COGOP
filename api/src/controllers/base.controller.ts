import { HttpResponseInit } from "@azure/functions";
import { LogService } from "../utils/log.service";

export abstract class BaseController {

    protected handleSuccess(data: any, statusCode: number = 200): HttpResponseInit {
        return {
            status: statusCode,
            jsonBody: {
                status: "SUCCESS",
                data: data
            }
        };
    }
    
    protected handleError(error: Error, statusCode: number = 500): HttpResponseInit {
        LogService.logError("CONTROLLER_ERROR", error.message, error);
        return {
            status: statusCode,
            jsonBody: {
                status: "FAIL",
                message: error.message
            }
        };
    }

    public static createInternalServerError(message: string = "Error interno del servidor"): HttpResponseInit {
        return {
            status: 500,
            jsonBody: {
                status: "FAIL",
                message: message
            }
        };
    }

    public static createForbiddenError(message: string = "Acceso no autorizado"): HttpResponseInit {
        return {
            status: 403,
            jsonBody: {
                status: "FORBIDDEN",
                message: message
            }
        };
    }
}