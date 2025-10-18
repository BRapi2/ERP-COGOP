import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, Unique } from "typeorm";
import { MonedaModel } from "../../../moneda/infrastructure/model/moneda.models";

@Entity({ name: "tipo_cambio" })
@Unique(["fecha", "monedaOrigen", "monedaDestino"])
export class TipoCambioModels extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: false })
    fecha: Date;

    @ManyToOne(() => MonedaModel)
    @JoinColumn({ name: 'moneda_id_origen' })
    monedaOrigen: MonedaModel

    @ManyToOne(() => MonedaModel)
    @JoinColumn({ name: 'moneda_id_destino' })
    monedaDestino: MonedaModel

    @Column({ type: "decimal", precision: 10, scale: 4, name: "tipo_cambio_compra" })
    tipoCambioCompra: string;

    @Column({ type: "decimal", precision: 10, scale: 4, name: "tipo_cambio_venta" })
    tipoCambioVenta: string;

}