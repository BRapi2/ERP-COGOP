import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { ReportesTipoModel } from "../../../reportes-tipo/infraestructure/model/reportes-tipo.models"
import { IglesiaModel } from "../../../../core/iglesia/infraestructure/model/iglesia.models"

@Entity({ name: "reportes_tipo_encargado" })
export class ReportesTipoEncargadoModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => ReportesTipoModel)
    @JoinColumn({ name: "reportes_tipo_id" })
    reportesTipo: ReportesTipoModel

    @ManyToOne(() => IglesiaModel, { eager: true })
    @JoinColumn({ name: "iglesia_id" })
    iglesia: IglesiaModel
}
