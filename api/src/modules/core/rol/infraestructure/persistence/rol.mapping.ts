import { Rol } from "../../domain/entities/rol.entity";
import { RolModel } from "../model/rol.models";

export class RolMapping {
    public static toEntity(model: RolModel): Rol {
        if (!model) throw new Error('Modelo no puede ser nulo');
        return Rol.crear({
            id: model.id,
            nombre: model.nombre,
            descripcion: model.descripcion
        });
    }

    public static toModel(entity: Rol): RolModel {
        if (!entity) throw new Error('Entidad no puede ser nula');
        const model = new RolModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        model.descripcion = entity.descripcion;
        return model;
    }
}
