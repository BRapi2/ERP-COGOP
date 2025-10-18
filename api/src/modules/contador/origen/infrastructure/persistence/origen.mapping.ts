import { Origen } from "../../domain/entities/origen.entity";
import { OrigenModel } from "../model/origen.model";
export class OrigenMapping {
    public static toEntity(model: OrigenModel): Origen {
        return Origen.crear({
            id: model.id,
            codigo: model.codigo,
            nombre: model.nombre
        });
    }

    public static toModel(entity: Origen): OrigenModel {
        const model = new OrigenModel();
        model.id = entity.id;
        model.codigo = entity.codigo;
        model.nombre = entity.nombre;
        return model;
    }
}