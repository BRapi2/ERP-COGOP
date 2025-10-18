import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { ReportesPeriodoModel } from "../../../reportes-periodo/infraestructure/model/reportes-periodo.models"

@Entity({ name: "reportes_periodo_descripcion" })
export class ReportesPeriodoDescripcionModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 45 })
    nombre: string

    @ManyToOne(() => ReportesPeriodoModel, { eager: true })
    @JoinColumn({ name: "reportes_periodo_id" })
    periodo: ReportesPeriodoModel
}
