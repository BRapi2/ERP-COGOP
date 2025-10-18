import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { VoucherDetailModel } from "./VoucherDetail.models";
import { OrigenModel } from "../../../origen/infrastructure/model/origen.model"
import { MesModel } from "../../../mes/infrastructure/model/mes.model";
import { YearModel } from "../../../year/infrastructure/model/year.model";
import { MonedaModel } from "../../../moneda/infrastructure/model/moneda.models";
import { ProveedorModel } from "../../../proveedor/infrastructure/model/Proveedor.model";
import { TipoComprobanteModel } from "../../../comprobantes/infrastructure/model/TipoComprobante.models";

@Entity({ name: "voucher" })
export class VoucherModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrigenModel, { nullable: false, eager: true })
    @JoinColumn({ name: "origen_id" })
    origen: OrigenModel;

    @OneToMany(() => VoucherDetailModel, (detalle) => detalle.voucher, {
        cascade: true,
        eager: true
    })
    detalles: VoucherDetailModel[];

    @ManyToOne(() => MesModel, { nullable: false, eager: true })
    @JoinColumn({ name: "mes_id" })
    mes: MesModel;

    @ManyToOne(() => YearModel, { nullable: false, eager: true })
    @JoinColumn({ name: "year_id" })
    year: YearModel;

    @Column({ type: "varchar", length: 150, nullable: true })
    glosa: string;

    @Column({ name: 'n_asiento', type: "int", nullable: true })
    nAsiento: number;

    @ManyToOne(() => MonedaModel, { nullable: false, eager: true })
    @JoinColumn({ name: "monedas_id" })
    moneda: MonedaModel;

    @ManyToOne(() => ProveedorModel, { nullable: false, eager: true })
    @JoinColumn({ name: "proveedores_id" })
    proveedor: ProveedorModel;

    @ManyToOne(() => TipoComprobanteModel, { nullable: false, eager: true })
    @JoinColumn({ name: "tipo_comprobante_id" })
    tipoComprobante: TipoComprobanteModel;

    @Column({ name: 'numero_documento', type: "varchar", length: 45, nullable: true })
    numeroDocumento: string;

    @Column({ name: 'fecha_emision_documento', type: "date", nullable: true })
    fechaEmisionDocumento: Date;

    @Column({ type: "decimal", precision: 15, scale: 2, nullable: false, default: 0.00 })
    total: number;
}