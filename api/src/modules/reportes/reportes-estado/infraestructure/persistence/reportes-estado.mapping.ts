import { ReportesEstadoEntity } from "../../domain/entities/reportes-estado.entity";
import { ReportesEstadoModel } from "../model/reportes-estado.models";

export class ReportesEstadoMapping {
    public static toEntity(model: ReportesEstadoModel): ReportesEstadoEntity {
        return ReportesEstadoEntity.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: ReportesEstadoEntity): ReportesEstadoModel {
        const model = new ReportesEstadoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}
