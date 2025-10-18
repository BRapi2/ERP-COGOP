import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { EstadoModel } from "../../modules/core/estado/infraestructure/model/estado.models";

@Entity({ name: "presbiterio-admin" })
export class Presbiterio extends BaseEntity {
  @PrimaryColumn()
  id: number

  @Column({ name: "area", type: "varchar", length: 20, nullable: false })
  area: string

  @Column({ name: "descripcion", type: "varchar", length: 45, nullable: false })
  descripcion: string

  @Column({ name: "descripcion_corta", type: "varchar", length: 45, nullable: false })
  descripcion_corta: string

  @ManyToOne(() => EstadoModel)
  @JoinColumn({ name: 'estado_id' })
  estado: EstadoModel

  @Column({ name: "observacion", type: "varchar", length: 200 })
  observacion: string
}