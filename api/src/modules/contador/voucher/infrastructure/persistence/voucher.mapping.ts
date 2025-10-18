import { VoucherEntity } from "../../domain/entities/Voucher.entity";
import { VoucherModel } from "../model/Voucher.models";
import { VoucherDetailMapping } from "./voucherDetail.mapping";

export class VoucherMapping {

    public static toEntity(model: VoucherModel): VoucherEntity {
        if (!model) {
            return null;
        }
        return VoucherEntity.crear({
            id: model.id,
            origen: model.origen,
            mes: model.mes,
            year: model.year,
            glosa: model.glosa,
            nAsiento: model.nAsiento,
            moneda: model.moneda,
            proveedor: model.proveedor,
            tipoComprobante: model.tipoComprobante,
            numeroDocumento: model.numeroDocumento,
            fechaEmisionDocumento: model.fechaEmisionDocumento,
            total: model.total,
            detalles: model.detalles ? model.detalles.map(VoucherDetailMapping.toEntity) : []
        });
    }

    public static toModel(entity: VoucherEntity): VoucherModel {
        if (!entity) {
            throw new Error('La entidad no puede ser nula');
        }

        const model = new VoucherModel();

        if (entity.id) {
            model.id = entity.id;
        }

        model.glosa = entity.glosa;
        model.nAsiento = entity.nAsiento;
        model.numeroDocumento = entity.numeroDocumento;
        model.fechaEmisionDocumento = entity.fechaEmisionDocumento;
        model.total = entity.total;

        if (!entity.origen?.id) {
            throw new Error('Origen ID es requerido');
        }
        model.origen = entity.origen as any;

        if (!entity.mes?.id) {
            throw new Error('Mes ID es requerido');
        }
        model.mes = entity.mes as any;

        if (!entity.year?.id) {
            throw new Error('Year ID es requerido');
        }
        model.year = entity.year as any;

        if (!entity.moneda?.id) {
            throw new Error('Moneda ID es requerido');
        }
        model.moneda = entity.moneda as any;

        if (!entity.proveedor?.id) {
            throw new Error('Proveedor ID es requerido');
        }
        model.proveedor = entity.proveedor as any;

        if (!entity.tipoComprobante?.id) {
            throw new Error('TipoDocumento ID es requerido');
        }
        model.tipoComprobante = entity.tipoComprobante as any;

        if (entity.detalles && entity.detalles.length > 0) {
            model.detalles = entity.detalles.map(VoucherDetailMapping.toModel);
        } else {
            model.detalles = [];
        }
        
        return model;
    }
}