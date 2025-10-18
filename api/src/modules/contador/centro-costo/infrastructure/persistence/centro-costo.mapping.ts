import { CentroCosto } from "../../domain/entities/CentroCosto.entity";
import { CentroCostoModel } from "../model/CentroCosto.models";

export class CentroCostoMapping {
    public static toEntity(model: CentroCostoModel): CentroCosto {
        return CentroCosto.crear({
            id: model.id,
            codigo: model.codigo,
            nombre: model.nombre,
            activo: model.activo
        });
    }

    public static toModel(entity: CentroCosto): CentroCostoModel {
        const model = new CentroCostoModel();
        model.id = entity.id;
        model.codigo = entity.codigo;
        model.nombre = entity.nombre;
        model.activo = entity.activo
        return model;
    }
}