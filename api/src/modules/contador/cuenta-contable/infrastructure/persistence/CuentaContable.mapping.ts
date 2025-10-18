import { CuentaContable } from "../../domain/entities/CuentaContable.entity";
import { CuentaContableModel } from "../model/CuentaContable.model";

export class CuentaContableMapping {
    public static toEntity(model: CuentaContableModel): CuentaContable {
        return CuentaContable.crear({
            id: model.id,
            codigoCuenta: model.codigoCuenta,
            nombreCuenta: model.nombreCuenta,
            nivel: model.nivel,
            tipoSaldo: model.tipoSaldo,
            permiteMovimiento: model.permiteMovimiento
        });
    }

    public static toModel(entity: CuentaContable): CuentaContableModel {
        const model = new CuentaContableModel();
        model.id = entity.id;
        model.codigoCuenta = entity.codigoCuenta;
        model.nombreCuenta = entity.nombreCuenta;
        model.nivel = entity.nivel;
        model.tipoSaldo = entity.tipoSaldo;
        model.permiteMovimiento = entity.permiteMovimiento;
        return model;
    }
}