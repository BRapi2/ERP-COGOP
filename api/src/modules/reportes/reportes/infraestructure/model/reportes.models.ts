import {
    Entity, PrimaryGeneratedColumn, Column, BaseEntity,
    ManyToOne, JoinColumn
} from "typeorm";
import { ReportesTipoModel } from "../../../reportes-tipo/infraestructure/model/reportes-tipo.models";
import { ReportesPeriodoDescripcionModel } from "../../../reportes-periodo-descripcion/infraestructure/model/reportes-periodo-descripcion.models";
import { ReportesEstadoModel } from "../../../reportes-estado/infraestructure/model/reportes-estado.models";
import { IglesiaModel } from "../../../../core/iglesia/infraestructure/model/iglesia.models";

@Entity({ name: "reportes" })
export class ReportesModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ReportesTipoModel)
    @JoinColumn({ name: "reportes_tipo_id" })
    reportesTipo: ReportesTipoModel;

    @ManyToOne(() => ReportesPeriodoDescripcionModel)
    @JoinColumn({ name: "reportes_periodo_descripcion_id" })
    reportesPeriodoDescripcion: ReportesPeriodoDescripcionModel;

    @Column({ type: "int" })
    year: number;

    @Column({ type: "varchar", length: 45 })
    nombres: string;

    @Column({ type: "varchar", length: 45 })
    apellidos: string;

    @Column({ type: "varchar", length: 45 })
    telefono: string;

    @Column({ type: "varchar", length: 45 })
    email: string;

    @Column({ type: "text" })
    direccion: string;

    @ManyToOne(() => ReportesEstadoModel, { nullable: true })
    @JoinColumn({ name: "reportes_estado_id" })
    reportesEstado: ReportesEstadoModel | null;

    @Column({ name: "data_id", type: "int", nullable: true })
    data: number;

    @ManyToOne(() => IglesiaModel)
    @JoinColumn({ name: "iglesia_id" })
    iglesia: IglesiaModel;
}
