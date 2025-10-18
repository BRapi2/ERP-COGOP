import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "finanzas_mensuales" })
export class ReportesFinanzasMensualesModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", nullable: true })
    fecha: Date;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    ingresos: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    egresos: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    saldo_final: number;

    @Column({ type: "varchar", length: 100, nullable: true })
    responsable: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    tipo_ingreso: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    tipo_egreso: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    metodo_pago: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    donaciones: number;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    gastos_actividad: number;

    @Column({ type: "text", nullable: true })
    observaciones: string;

    @Column({ type: "text", nullable: true })
    comentarios: string;
}
