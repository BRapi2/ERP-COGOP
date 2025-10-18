import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm"
import { DistritoModel } from "../../../distrito/infrastructure/model/Distrito.model"
import { EstadoModel } from "../../../estado/infraestructure/model/estado.models"

@Entity({ name: "iglesia" })
export class IglesiaModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "nombre", type: "varchar", length: 45 })
    nombre: string

    @Column({ name: "nombre_corto", type: "varchar", length: 45 })
    nombre_corto: string

    @Column({ name: "telefono_fijo", type: "varchar", length: 15 })
    telefono_fijo: string

    @Column({ name: "telefono_celular", type: "varchar", length: 15 })
    telefono_celular: string

    @Column({ name: "email", type: "varchar", length: 45 })
    email: string

    @Column({ name: "fecha_organizacion", type: "varchar", length: 11 })
    fecha_organizacion: string

    @Column({ name: "fecha_inicio_reporte", type: "varchar", length: 11 })
    fecha_inicio_reporte: string

    @ManyToOne(() => DistritoModel)
    @JoinColumn({ name: 'distrito_id' })
    distrito: DistritoModel

    @Column({ name: "direccion", type: "varchar", length: 150 })
    direccion: string

    @ManyToOne(() => EstadoModel)
    @JoinColumn({ name: 'estado_id' })
    estado: EstadoModel

    @Column({ name: "observacion", type: "varchar", length: 100 })
    observacion: string
}