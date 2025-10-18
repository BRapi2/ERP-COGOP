import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { container } from "../dependencias/Container";
import { AuthController } from "./Auth.controller";
import { validateBodyMiddleware } from "../middlewares/validation.middleware";
import { LoginDto } from "../dtos/core/auth.dto";

export const login = async (req: HttpRequest, context: InvocationContext) => {
    const validationErrorResponse = await validateBodyMiddleware(LoginDto, req);
    if (validationErrorResponse) return validationErrorResponse;
    const controller = container.resolve(AuthController);
    return controller.login(req);
};