import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { VoucherModel } from "./Voucher.models";
import { CuentaContableModel } from "../../../cuenta-contable/infrastructure/model/CuentaContable.model";
import { CentroCostoModel } from "../../../centro-costo/infrastructure/model/CentroCosto.models";

@Entity({ name: "voucher_detalle" })
export class VoucherDetailModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => VoucherModel, (voucher) => voucher.detalles)
    @JoinColumn({ name: "voucher_id" }) 
    voucher: VoucherModel;

    @ManyToOne(() => CuentaContableModel, { nullable: false, eager: true })
    @JoinColumn({ name: "cuentas_contables_id" })
    cuentaContable: CuentaContableModel;

    @ManyToOne(() => CentroCostoModel, { nullable: true, eager: true }) 
    @JoinColumn({ name: "centros_costo_id" })
    centroCosto: CentroCostoModel;

    @Column({ type: "decimal", precision: 15, scale: 2, default: 0.00 })
    debe: number;

    @Column({ type: "decimal", precision: 15, scale: 2, default: 0.00 })
    haber: number;
}