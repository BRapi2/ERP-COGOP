import { YearMesMapping } from "../../../year-mes/infrastructure/persistence/YearMes.mapping";
import { TipoCambioCierreEntity } from "../../domain/entities/TipoCambioCierre.entity";
import { TipoCambioCierreModel } from "../model/tipo-cambio-cierre.models";

export class TipoCambioCierreMapping {
    public static toEntity(model: TipoCambioCierreModel): TipoCambioCierreEntity {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        if (!model.yearMes) {
            throw new Error('Mes y Año no pueden ser nulos');
        }
        return TipoCambioCierreEntity.crear({
            id: model.id,
            yearMes: model.yearMes,
            compra: model.compra,
            venta: model.venta
        });
    }

    public static toModel(entity: TipoCambioCierreEntity): TipoCambioCierreModel {
        if (!entity) { throw new Error('Entidad no puede ser nula'); }
        const model = new TipoCambioCierreModel();
        model.id = entity.id;
        if (!entity.yearMes?.id) {
            throw new Error('Año y Mes ID es requerido');
        }
        model.yearMes = entity.yearMes as any;
        model.compra = entity.compra;
        model.venta = entity.venta;
        return model;
    }
}