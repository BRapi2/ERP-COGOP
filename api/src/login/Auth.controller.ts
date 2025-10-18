import { HttpRequest, HttpResponseInit } from "@azure/functions";
import { injectable, inject } from "tsyringe";
import { BaseController } from "../controllers/base.controller";
import { LoginDto } from "../dtos/core/auth.dto";
import { AuthService } from "./Auth.service";

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(AuthService) private service: AuthService
  ) {
    super();
  }

  async login(req: HttpRequest): Promise<HttpResponseInit> {
    try {
      const dto = req.validatedBody as LoginDto;
      const result = await this.service.login(dto);
      return this.handleSuccess(result);
    } catch (error) {
      return this.handleError(error, error.message.includes('no encontrado') ? 404 : 401);
    }
  }
}