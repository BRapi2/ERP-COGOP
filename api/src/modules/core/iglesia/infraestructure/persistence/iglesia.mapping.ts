import { IglesiaEntity } from "../../domain/entities/iglesia.entity";
import { IglesiaModel } from "../model/iglesia.models";

export class IglesiaMapping {
    public static toEntity(model: IglesiaModel): IglesiaEntity {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        return IglesiaEntity.crear({
            id: model.id,
            nombre: model.nombre,
            nombre_corto: model.nombre_corto,
            telefono_fijo: model.telefono_fijo,
            telefono_celular: model.telefono_celular,
            email: model.email,
            fecha_organizacion: model.fecha_organizacion,
            fecha_inicio_reporte: model.fecha_inicio_reporte,
            distrito: model.distrito,
            direccion: model.direccion,
            estado: model.estado,
            observacion: model.observacion,
        });
    }

    public static toModel(entity: IglesiaEntity): IglesiaModel {
        if (!entity) {
            throw new Error('Entidad no puede ser nula');
        }
        const model = new IglesiaModel();
        model.id = entity.id;
        model.nombre = entity.nombre;
        model.nombre_corto = entity.nombre_corto;
        model.telefono_fijo = entity.telefono_fijo;
        model.telefono_celular = entity.telefono_celular;
        model.email = entity.email;
        model.fecha_organizacion = entity.fecha_organizacion;
        model.fecha_inicio_reporte = entity.fecha_inicio_reporte;

        if (!entity.distrito.id) {
            throw new Error('Distrito ID es requerido');
        }
        model.distrito = entity.distrito as any;

        model.direccion = entity.direccion;

        if (!entity.estado.id) {
            throw new Error('Estado ID es requerido');
        }
        model.estado = entity.estado as any;

        model.observacion = entity.observacion;

        return model;
    }
}
