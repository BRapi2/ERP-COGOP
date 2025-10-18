import { TipoDocumento } from "../../domain/entities/TipoDocumento.entity";
import { TipoDocumentoModel } from "../model/TipoDocumento.model";

export class TipoDocumentoMapping {
    public static toEntity(model: TipoDocumentoModel): TipoDocumento {
         return TipoDocumento.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: TipoDocumento): TipoDocumentoModel {
        const model = new TipoDocumentoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}