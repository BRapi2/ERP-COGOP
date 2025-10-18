import { ReportesFinanzasMensualesEntity } from "../../domain/entities/reportes-finanzas-mensuales.entity";
import { ReportesFinanzasMensualesModel } from "../model/reportes-finanzas-mensuales.models";

export class ReportesFinanzasMensualesMapping {
    public static toEntity(model: ReportesFinanzasMensualesModel): ReportesFinanzasMensualesEntity {
        if (!model) throw new Error("Modelo no puede ser nulo");
        return ReportesFinanzasMensualesEntity.crear({
            id: model.id,
            fecha: model.fecha,
            ingresos: Number(model.ingresos),
            egresos: Number(model.egresos),
            saldo_final: Number(model.saldo_final),
            responsable: model.responsable,
            tipo_ingreso: model.tipo_ingreso,
            tipo_egreso: model.tipo_egreso,
            metodo_pago: model.metodo_pago,
            donaciones: Number(model.donaciones),
            gastos_actividad: Number(model.gastos_actividad),
            observaciones: model.observaciones,
            comentarios: model.comentarios,
        });
    }

    public static toModel(entity: ReportesFinanzasMensualesEntity): ReportesFinanzasMensualesModel {
        if (!entity) throw new Error("Entidad no puede ser nula");
        const model = new ReportesFinanzasMensualesModel();
        model.id = entity.id;
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
