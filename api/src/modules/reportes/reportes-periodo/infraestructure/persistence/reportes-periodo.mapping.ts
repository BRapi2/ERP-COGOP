import { ReportesPeriodoEntity } from "../../domain/entities/reportes-periodo.entity";
import { ReportesPeriodoModel } from "../model/reportes-periodo.models";

export class ReportesPeriodoMapping {
    public static toEntity(model: ReportesPeriodoModel): ReportesPeriodoEntity {
        return ReportesPeriodoEntity.crear({
            id: model.id,
            nombre: model.nombre
        });
    }

    public static toModel(entity: ReportesPeriodoEntity): ReportesPeriodoModel {
        const model = new ReportesPeriodoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        return model;
    }
}
