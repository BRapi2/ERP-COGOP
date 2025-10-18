import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { DepartamentoModel } from "../../../departamento/infrastructure/model/Departamento.models";

@Entity({ name: "provincias" })
export class ProvinciaModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 45 })
    nombre: string;

    @OneToOne(() => DepartamentoModel)
    @JoinColumn({ name: 'departamentos_id' })
    departamento: DepartamentoModel;
}