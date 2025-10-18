import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"

import { DepartamentoModel } from "../../modules/core/departamento/infrastructure/model/Departamento.models"

@Entity({name:"provincias"})
export class Provincias extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({ type: "varchar", length: 45})
    nombre: string

    @OneToOne(() => DepartamentoModel)
    @JoinColumn({name:'departamentos_id'})
    departamentos: DepartamentoModel
}