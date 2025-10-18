import { ProvinciaEntity } from "../../domain/entities/Provincia.entity";
import { ProvinciaModel } from "../model/Provincia.model";

export class ProvinciaMapping {
    public static toEntity(model: ProvinciaModel): ProvinciaEntity {
        return ProvinciaEntity.crear({
            id: model.id,
            nombre: model.nombre,
            departamento: model.departamento
        });
    }

    public static toModel(entity: ProvinciaEntity): ProvinciaModel {
        const model = new ProvinciaModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        if(!entity.departamento.id){
            throw new Error('Departamento ID es requerido');
        }
        model.departamento = entity.departamento as any;
        return model;
    }
}