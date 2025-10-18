import { FinanzasMensualesEntity } from "../../domain/entities/finanzas-mensuales.entity";
import { FinanzasMensualesModel } from "../model/finanzas-mensuales.models";

export class FinanzasMensualesMapping {
    public static toEntity(model: FinanzasMensualesModel): FinanzasMensualesEntity {
        if (!model) {
            throw new Error("Modelo no puede ser nulo");
        }

        return FinanzasMensualesEntity.crear({
            id: model.id,
            fecha: model.fecha instanceof Date ? model.fecha : model.fecha ? new Date(model.fecha as any) : null,
            ingresos: model.ingresos !== null && model.ingresos !== undefined ? Number(model.ingresos) : null,
            egresos: model.egresos !== null && model.egresos !== undefined ? Number(model.egresos) : null,
            saldo_final: model.saldo_final !== null && model.saldo_final !== undefined ? Number(model.saldo_final) : null,
            responsable: model.responsable,
            tipo_ingreso: model.tipo_ingreso,
            tipo_egreso: model.tipo_egreso,
            metodo_pago: model.metodo_pago,
            donaciones: model.donaciones !== null && model.donaciones !== undefined ? Number(model.donaciones) : null,
            gastos_actividad: model.gastos_actividad !== null && model.gastos_actividad !== undefined ? Number(model.gastos_actividad) : null,
            observaciones: model.observaciones,
            comentarios: model.comentarios,
        });
    }

    public static toModel(entity: FinanzasMensualesEntity): FinanzasMensualesModel {
        if (!entity) {
            throw new Error("Entidad no puede ser nula");
        }

        const model = new FinanzasMensualesModel();
        if (entity.id !== undefined && entity.id !== null) model.id = entity.id;
        model.fecha = entity.fecha as any;
        model.ingresos = entity.ingresos as any;
        model.egresos = entity.egresos as any;
        model.saldo_final = entity.saldo_final as any;
        model.responsable = entity.responsable as any;
        model.tipo_ingreso = entity.tipo_ingreso as any;
        model.tipo_egreso = entity.tipo_egreso as any;
        model.metodo_pago = entity.metodo_pago as any;
        model.donaciones = entity.donaciones as any;
        model.gastos_actividad = entity.gastos_actividad as any;
        model.observaciones = entity.observaciones as any;
        model.comentarios = entity.comentarios as any;

        return model;
    }
}
