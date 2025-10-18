import { ReportesPeriodoDescripcionEntity } from "../../domain/entities/reportes-periodo-descripcion.entity";
import { ReportesPeriodoDescripcionModel } from "../model/reportes-periodo-descripcion.models";

export class ReportesPeriodoDescripcionMapping {
    public static toEntity(model: ReportesPeriodoDescripcionModel): ReportesPeriodoDescripcionEntity {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        return ReportesPeriodoDescripcionEntity.crear({
            id: model.id,
            nombre: model.nombre,
            periodo: model.periodo as any
        });
    }

    public static toModel(entity: ReportesPeriodoDescripcionEntity): ReportesPeriodoDescripcionModel {
        if (!entity) {
            throw new Error('Entidad no puede ser nula');
        }

        if (!entity.periodo.id) {
            throw new Error('ID del periodo es requerido');
        }

        const model = new ReportesPeriodoDescripcionModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        model.periodo = entity.periodo as any;
        return model;
    }
}
