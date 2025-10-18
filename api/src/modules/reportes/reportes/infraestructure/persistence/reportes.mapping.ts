import { ReportesEntity } from "../../domain/entities/reportes.entity";
import { ReportesModel } from "../model/reportes.models";

export class ReportesMapping {

    /** Convierte un modelo de TypeORM a entidad de dominio */
    public static toEntity(model: ReportesModel): ReportesEntity {
        if (!model) {
            throw new Error("Modelo no puede ser nulo");
        }

        return ReportesEntity.crear({
            id: model.id,
            reportesTipo: model.reportesTipo as any,
            reportesPeriodoDescripcion: model.reportesPeriodoDescripcion as any,
            year: model.year,
            nombres: model.nombres,
            apellidos: model.apellidos,
            telefono: model.telefono,
            email: model.email,
            direccion: model.direccion,
            reportesEstado: model.reportesEstado as any,
            iglesia: model.iglesia as any,

            // ✅ Solo guardamos el id de la relación dinámica
            data: model.data ?? null,
        });
    }

    /** Convierte una entidad de dominio a modelo de TypeORM */
    public static toModel(entity: ReportesEntity): ReportesModel {
        if (!entity) {
            throw new Error("Entidad no puede ser nula");
        }

        const model = new ReportesModel();
        model.id = entity.id;
        model.reportesTipo = entity.reportesTipo as any;
        model.reportesPeriodoDescripcion = entity.reportesPeriodoDescripcion as any;
        model.year = entity.year;
        model.nombres = entity.nombres;
        model.apellidos = entity.apellidos;
        model.telefono = entity.telefono as any;
        model.email = entity.email;
        model.direccion = entity.direccion;

        if (entity.reportesEstado && !(entity.reportesEstado as any).id) {
            throw new Error("Estado ID es requerido");
        }
        model.reportesEstado = entity.reportesEstado as any;

        if (!entity.iglesia || !(entity.iglesia as any).id) {
            throw new Error("Iglesia ID es requerido");
        }
        model.iglesia = entity.iglesia as any;

        // ✅ Solo guardamos el id dinámico
        model.data = entity.data ?? null;

        return model;
    }
}
