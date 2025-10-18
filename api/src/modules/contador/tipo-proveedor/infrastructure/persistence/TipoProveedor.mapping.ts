import { TipoProveedor } from "../../domain/entities/TipoProveedor.entity";
import { TipoProveedorModel } from "../model/TipoProveedor.model";

export class TipoProveedorMapping {
    public static toEntity(model: TipoProveedorModel): TipoProveedor {
         return TipoProveedor.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: TipoProveedor): TipoProveedorModel {
        const model = new TipoProveedorModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}