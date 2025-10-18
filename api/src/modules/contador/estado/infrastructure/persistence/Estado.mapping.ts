import { EstadoEntity } from "../../domain/entities/Estado.entity";
import { EstadoModel } from "../model/estado.models";


export class EstadoMapping {
    public static toEntity(model: EstadoModel): EstadoEntity {
        return EstadoEntity.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: EstadoEntity): EstadoModel {
        const model = new EstadoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}