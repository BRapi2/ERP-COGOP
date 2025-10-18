import { CuentaAjusteDiferenciaCambio } from "../../domain/entities/cuenta-ajuste-diferencia-cambio.entity";
import { CuentaAjusteDiferenciaCambioModel } from "../model/cuenta-ajuste-diferencia-cambio.models";

export class CuentaAjusteDiferenciaCambioMapping {
    public static toEntity(model: CuentaAjusteDiferenciaCambioModel): CuentaAjusteDiferenciaCambio {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        return CuentaAjusteDiferenciaCambio.crear({
            id: model.id,
            valor: model.valor,
            nombre: model.nombre,
            year: model.year
        });
    }

    public static toModel(entity: CuentaAjusteDiferenciaCambio): CuentaAjusteDiferenciaCambioModel {
        if (!entity) {
            throw new Error('Entidad no puede ser nula');
        }
        const model = new CuentaAjusteDiferenciaCambioModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        model.valor = entity.valor;
        if (!entity.year?.id) {
            throw new Error('Year ID es requerido');
        }
        model.year = entity.year as any;
        return model;
    }
}