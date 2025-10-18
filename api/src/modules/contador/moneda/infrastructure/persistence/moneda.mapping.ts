import { Moneda } from "../../domain/entities/moneda.entity";
import { MonedaModel } from "../model/moneda.models";

export class MonedaMapping {
    public static toEntity(model: MonedaModel): Moneda {
        return Moneda.crear({
            id: model.id,
            codigoMoneda: model.codigoMoneda,
            nombreMoneda: model.nombreMoneda
        });
    }

    public static toModel(entity: Moneda): MonedaModel {
        const model = new MonedaModel();
        model.id = entity.id;
        model.codigoMoneda = entity.codigoMoneda;
        model.nombreMoneda = entity.nombreMoneda;
        return model;
    }
}