import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { ProvinciaModel } from "../../../provincia/infrastructure/model/Provincia.model";

@Entity({ name: "distritos" })
export class DistritoModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45 })
    nombre: string;

    @OneToOne(() => ProvinciaModel)
    @JoinColumn({ name: 'provincias_id' })
    provincia: ProvinciaModel;
}