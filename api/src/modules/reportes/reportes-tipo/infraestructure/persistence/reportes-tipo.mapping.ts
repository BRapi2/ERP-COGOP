import { ReportesTipoEntity } from "../../domain/entities/reportes-tipo.entity";
import { ReportesTipoModel } from "../model/reportes-tipo.models";

export class ReportesTipoMapping {
    public static toEntity(model: ReportesTipoModel): ReportesTipoEntity {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        return ReportesTipoEntity.crear({
            id: model.id,
            nombre: model.nombre,
            periodo: model.periodo as any,
            reportesTipoEncargado: model.reportesTipoEncargado as any,
        });
    }

    public static toModel(entity: ReportesTipoEntity): ReportesTipoModel {
        if (!entity) {
            throw new Error('Entidad no puede ser nula');
        }

        if (!entity.periodo?.id) {
            throw new Error('El ID del periodo es obligatorio');
        }

        const model = new ReportesTipoModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        model.periodo = entity.periodo as any;
        model.reportesTipoEncargado = entity.reportesTipoEncargado as any;

        return model;
    }
}
