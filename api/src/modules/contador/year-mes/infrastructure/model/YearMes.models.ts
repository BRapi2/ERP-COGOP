import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { MesModel } from "../../../mes/infrastructure/model/mes.model";
import { YearModel } from "../../../year/infrastructure/model/year.model";


@Entity({ name: "year_mes" })
export class YearMesModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MesModel, { nullable: false, eager: true })
    @JoinColumn({ name: "mes_id" })
    mes: MesModel;

    @ManyToOne(() => YearModel, { nullable: false, eager: true })
    @JoinColumn({ name: "year_id" })
    year: YearModel;

}