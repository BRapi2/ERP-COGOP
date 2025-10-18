import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { YearMesModel } from "../../../year-mes/infrastructure/model/YearMes.models";

@Entity({ name: "tipo_cambio_cierre" })
export class TipoCambioCierreModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => YearMesModel)
    @JoinColumn({ name: "year_mes_id" })
    yearMes: YearMesModel;

    @Column({ type: "decimal", precision: 10, scale: 4})
    compra: string;

    @Column({ type: "decimal", precision: 10, scale: 4 })
    venta: string;
}