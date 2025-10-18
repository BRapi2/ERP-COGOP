import { TipoCambio } from "../../domain/entities/tipo-cambio.entity";
import { TipoCambioModels } from "../model/tipo-cambio.models";

export class TipoCambioMapping {
    public static toEntity(model: TipoCambioModels): TipoCambio {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        if (!model.monedaOrigen || !model.monedaDestino) {
            throw new Error('Moneda Origen o Moneda Destino no pueden ser nulos');
        }
        return TipoCambio.crear({
            id: model.id,
            fecha: model.fecha,
            tipoCambioCompra: model.tipoCambioCompra,
            tipoCambioVenta: model.tipoCambioVenta,
            monedaOrigen: model.monedaOrigen,
            monedaDestino: model.monedaDestino
        });
    }

    public static toModel(entity: TipoCambio): TipoCambioModels {
        if (!entity) {throw new Error('Entidad no puede ser nula');}
        const model = new TipoCambioModels();
        model.id = entity.id;
        model.fecha = entity.fecha;
        model.tipoCambioCompra = entity.tipoCambioCompra;
        model.tipoCambioVenta = entity.tipoCambioVenta
        if (!entity.monedaDestino?.id) {
            throw new Error('Moneda destino ID es requerido');
        }
        model.monedaDestino = entity.monedaDestino as any;
        if (!entity.monedaOrigen?.id) {
            throw new Error('Moneda Origen ID es requerido');
        }
        model.monedaOrigen = entity.monedaOrigen as any;
        return model;
    }
}