import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity({ name: "monedas" })
export class MonedaModel  extends BaseEntity{

    @PrimaryColumn({ type: "int" })
    id: number;

    @Column({ name: "codigo_moneda", length: 3, unique: true, nullable: false })
    codigoMoneda: string;

    @Column({ name: "nombre_moneda", length: 50, nullable: false })
    nombreMoneda: string;
}