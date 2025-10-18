import { ReportesMesPlantadorEntity } from "../../domain/entities/reportes-mes-plantador.entity";
import { ReportesMesPlantadorModel } from "../model/reportes-mes-plantador.models";

export class ReportesMesPlantadorMapping {
    public static toEntity(model: ReportesMesPlantadorModel): ReportesMesPlantadorEntity {
        if (!model) {
            throw new Error("Modelo no puede ser nulo");
        }

        return ReportesMesPlantadorEntity.crear({
            id: model.id,
            direccion_completa: model.direccion_completa,
            fecha_proyectada_mision: model.fecha_proyectada_mision,
            nro_nuevos_contactos: model.nro_nuevos_contactos,
            nro_nuevos_gdc: model.nro_nuevos_gdc,
            nro_nuevas_conversiones: model.nro_nuevas_conversiones,
            nro_consolidados: model.nro_consolidados,
            nro_discipulados: model.nro_discipulados,
            nro_bautizados_agua: model.nro_bautizados_agua,
            nro_nuevas_personas_gdc: model.nro_nuevas_personas_gdc,
            nro_nuevos_lideres_gdc: model.nro_nuevos_lideres_gdc,
            nro_creyentes: model.nro_creyentes,
            nro_miembros: model.nro_miembros,
            nro_lideres_gdc: model.nro_lideres_gdc,
            total_personas_gdc: model.total_personas_gdc,
            total_personas_discipulados: model.total_personas_discipulados,
            visita_pastor_iglesia_central: model.visita_pastor_iglesia_central,
            visita_supervisor_distrital: model.visita_supervisor_distrital,
            comentario: model.comentario,
        });
    }

    public static toModel(entity: ReportesMesPlantadorEntity): ReportesMesPlantadorModel {
        if (!entity) {
            throw new Error("Entidad no puede ser nula");
        }

        const model = new ReportesMesPlantadorModel();
        model.id = entity.id;
        model.direccion_completa = entity.direccion_completa;
        model.fecha_proyectada_mision = entity.fecha_proyectada_mision;
        model.nro_nuevos_contactos = entity.nro_nuevos_contactos;
        model.nro_nuevos_gdc = entity.nro_nuevos_gdc;
        model.nro_nuevas_conversiones = entity.nro_nuevas_conversiones;
        model.nro_consolidados = entity.nro_consolidados;
        model.nro_discipulados = entity.nro_discipulados;
        model.nro_bautizados_agua = entity.nro_bautizados_agua;
        model.nro_nuevas_personas_gdc = entity.nro_nuevas_personas_gdc;
        model.nro_nuevos_lideres_gdc = entity.nro_nuevos_lideres_gdc;
        model.nro_creyentes = entity.nro_creyentes;
        model.nro_miembros = entity.nro_miembros;
        model.nro_lideres_gdc = entity.nro_lideres_gdc;
        model.total_personas_gdc = entity.total_personas_gdc;
        model.total_personas_discipulados = entity.total_personas_discipulados;
        model.visita_pastor_iglesia_central = entity.visita_pastor_iglesia_central;
        model.visita_supervisor_distrital = entity.visita_supervisor_distrital;
        model.comentario = entity.comentario;

        return model;
    }
}
