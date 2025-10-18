import { ReportesTipoEncargadoEntity } from "../../domain/entities/reportes-tipo-encargado.entity";
import { ReportesTipoEncargadoModel } from "../model/reportes-tipo-encargado.models";

export class ReportesTipoEncargadoMapping {
    public static toEntity(model: ReportesTipoEncargadoModel): ReportesTipoEncargadoEntity {
        if (!model) {
            throw new Error("Modelo no puede ser nulo");
        }

        return ReportesTipoEncargadoEntity.crear({
            id: model.id,
            reportesTipo: model.reportesTipo as any,
            iglesia: model.iglesia as any,
        });
    }

    public static toModel(entity: ReportesTipoEncargadoEntity): ReportesTipoEncargadoModel {
        if (!entity) {
            throw new Error("Entidad no puede ser nula");
        }

        if (!entity.reportesTipo?.id) {
            throw new Error("ID de reportesTipo es requerido");
        }
        if (!entity.iglesia?.id) {
            throw new Error("ID de iglesia es requerido");
        }

        const model = new ReportesTipoEncargadoModel();
        model.id = entity.id;
        model.reportesTipo = entity.reportesTipo as any;
        model.iglesia = entity.iglesia as any;

        return model;
    }
}
