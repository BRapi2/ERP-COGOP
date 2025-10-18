import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export enum TipoSaldo {
    DEUDOR = "DEUDOR",
    ACREEDOR = "ACREEDOR",
}

@Entity({ name: "cuentas_contables" })
export class CuentaContableModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "codigo_cuenta", length: 15, nullable: true })
    codigoCuenta: string;

    @Column({ name: "nombre_cuenta", length: 100, nullable: false })
    nombreCuenta: string;

    @Column({ type: "int", nullable: true })
    nivel: number;

    @Column({
        type: "enum",
        enum: TipoSaldo,
        name: "tipo_saldo",
        nullable: false
    })
    tipoSaldo: TipoSaldo;

    @Column({ name: "permite_movimiento", nullable: false })
    permiteMovimiento: boolean;
}