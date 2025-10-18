import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { YearModel } from "../../../year/infrastructure/model/year.model";

@Entity({ name: "cuenta_ajuste_diferencia_cambio" })
export class CuentaAjusteDiferenciaCambioModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, nullable: false })
    nombre: string;

    @Column({ length: 5, nullable: false })
    valor: string;

    @ManyToOne(() => YearModel)
    @JoinColumn({ name: "year_id" })
    year: YearModel;

}