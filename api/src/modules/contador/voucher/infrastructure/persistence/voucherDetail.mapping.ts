// src/infrastructure/persistence/VoucherDetail.mapping.ts

import { VoucherDetailEntity } from "../../domain/entities/VoucherDetail.entity";
import { VoucherDetailModel } from "../model/VoucherDetail.models";

export class VoucherDetailMapping {
    public static toEntity(model: VoucherDetailModel): VoucherDetailEntity {
        if (!model) return null;
        return VoucherDetailEntity.crear({
            id: model.id,
            cuentaContable: model.cuentaContable,
            centroCosto: model.centroCosto,
            debe: model.debe,
            haber: model.haber
        });
    }

    public static toModel(entity: VoucherDetailEntity): VoucherDetailModel {
        if (!entity) return null;
        const model = new VoucherDetailModel();
        if (entity.id) model.id = entity.id;
        model.cuentaContable = entity.cuentaContable as any;
        if (entity.centroCosto) model.centroCosto = entity.centroCosto as any;
        model.debe = entity.debe;
        model.haber = entity.haber;
        return model;
    }
}