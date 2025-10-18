import { DistritoEntity } from "../../domain/entities/Distrito.entity";
import { DistritoModel } from "../model/Distrito.model";

export class DistritoMapping {
    public static toEntity(model: DistritoModel): DistritoEntity {
        return DistritoEntity.crear({
            id: model.id,
            nombre: model.nombre,
            provincia: model.provincia
        });
    }

    public static toModel(entity: DistritoEntity): DistritoModel {
        const model = new DistritoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        if(!entity.provincia.id){
            throw new Error('Distrito es requerido');
        }
        model.provincia = entity.provincia as any;
        return model;
    }
}