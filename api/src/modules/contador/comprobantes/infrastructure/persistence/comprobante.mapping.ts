import { TipoComprobante } from "../../domain/entities/comprobante.entity";
import { TipoComprobanteModel } from "../model/TipoComprobante.models";

export class ComprobanteMapping {
    public static toEntity(model: TipoComprobanteModel): TipoComprobante {
        return TipoComprobante.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: TipoComprobante): TipoComprobanteModel {
        const model = new TipoComprobanteModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}