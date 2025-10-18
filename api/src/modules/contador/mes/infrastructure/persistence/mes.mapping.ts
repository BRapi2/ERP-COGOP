import { Mes } from "../../domain/entities/mes.entity";
import { MesModel } from "../model/mes.model";

export class MesMapping {
    public static toEntity(model: MesModel): Mes {
         return Mes.crear({
            id: model.id,
            name: model.name
        });
    }

    public static toModel(entity: Mes): MesModel {
        const model = new MesModel();
        model.id = entity.id;
        model.name = entity.name;
        return model;
    }
}
