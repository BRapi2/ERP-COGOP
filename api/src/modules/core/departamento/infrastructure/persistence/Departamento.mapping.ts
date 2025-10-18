import { DepartamentoEntity } from "../../domain/entities/Departamento.entity";
import { DepartamentoModel } from "../model/Departamento.models";

export class DepartamentoMapping {
    public static toEntity(model: DepartamentoModel): DepartamentoEntity {
        return DepartamentoEntity.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: DepartamentoEntity): DepartamentoModel {
        const model = new DepartamentoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}