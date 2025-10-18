import { PerfilEntity } from "../../domain/entities/perfil.entity";
import { PerfilModel } from "../model/perfil.models";

export class PerfilMapping {
    public static toEntity(model: PerfilModel): PerfilEntity {
        return PerfilEntity.crear({
            id: model.id,
            nombre: model.nombre,
            apellido: model.apellido
        });
    }

    public static toModel(entity: PerfilEntity): PerfilModel {
        const model = new PerfilModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        model.apellido = entity.apellido;
        return model;
    }
}