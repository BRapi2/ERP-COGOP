import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { ReportesPeriodoModel } from "../../../reportes-periodo/infraestructure/model/reportes-periodo.models"
import { ReportesTipoEncargadoModel } from "../../../reportes_tipo_encargado/infraestructure/model/reportes-tipo-encargado.models"
@Entity({ name: "reportes_tipo" })
export class ReportesTipoModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 45 })
    nombre: string

    @ManyToOne(() => ReportesPeriodoModel, { eager: true })
    @JoinColumn({ name: "reportes_periodo_id" })
    periodo: ReportesPeriodoModel

    @OneToMany(
        () => ReportesTipoEncargadoModel,
        (encargado) => encargado.reportesTipo,
    )
    reportesTipoEncargado: ReportesTipoEncargadoModel[];
}
