import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "reportes_mes_plantador" })
export class ReportesMesPlantadorModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", nullable: true })
    direccion_completa: string;

    @Column({ type: "date", nullable: true })
    fecha_proyectada_mision: Date;

    @Column({ type: "int", nullable: true })
    nro_nuevos_contactos: number;

    @Column({ type: "int", nullable: true })
    nro_nuevos_gdc: number;

    @Column({ type: "int", nullable: true })
    nro_nuevas_conversiones: number;

    @Column({ type: "int", nullable: true })
    nro_consolidados: number;

    @Column({ type: "int", nullable: true })
    nro_discipulados: number;

    @Column({ type: "int", nullable: true })
    nro_bautizados_agua: number;

    @Column({ type: "int", nullable: true })
    nro_nuevas_personas_gdc: number;

    @Column({ type: "int", nullable: true })
    nro_nuevos_lideres_gdc: number;

    @Column({ type: "int", nullable: true })
    nro_creyentes: number;

    @Column({ type: "int", nullable: true })
    nro_miembros: number;

    @Column({ type: "int", nullable: true })
    nro_lideres_gdc: number;

    @Column({ type: "int", nullable: true })
    total_personas_gdc: number;

    @Column({ type: "int", nullable: true })
    total_personas_discipulados: number;

    @Column({ type: "varchar", nullable: true })
    visita_pastor_iglesia_central: string;

    @Column({ type: "varchar", nullable: true })
    visita_supervisor_distrital: string;

    @Column({ type: "text", nullable: true })
    comentario: string;
}
