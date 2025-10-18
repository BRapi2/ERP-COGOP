import { VoucherController } from "../controllers/Voucher.controller";
import { ListQueryDto } from "../../../../../dtos/listQuery.dto";
import { VoucherDto } from "../../application/dto/voucher.dto";
import { FindOrCreateVoucherDto } from "../../application/dto/find_voucher.dto";
import { container } from "../../../../../dependencias/Container";
import { validateQueryMiddleware } from "../../../../../middlewares/queryValidation.middleware";
import { validateBodyMiddleware } from "../../../../../middlewares/validation.middleware";
import { createAuthHandler } from "../../../../../utils/protectedRouteHandler";


export const getListarVoucher = createAuthHandler((req, ctx, jwt) => container.resolve(VoucherController).list(req.validatedQuery, jwt.data), {
    validateFn: (req) => validateQueryMiddleware(ListQueryDto, req),
    logAction: 'Listado de Centro Costo'
});

export const addVocher = createAuthHandler((req, ctx, jwt) => container.resolve(VoucherController).save(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(VoucherDto, req),
    logAction: 'Creación/Actualización de Voucher'
});

export const getListarVoucherAsiento = createAuthHandler((req, ctx, jwt) => container.resolve(VoucherController).findOrCreate(req, jwt.data), {
    validateFn: (req) => validateBodyMiddleware(FindOrCreateVoucherDto, req),
    logAction: 'Obtener/Crear Voucher'
});

export const getListarSettings = createAuthHandler((req, ctx, jwt) => container.resolve(VoucherController).settings(jwt.data));

