import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"


@Entity({name:"departamentos"})
export class DepartamentoModel extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({ type: "varchar", length: 45})
    nombre: string

    
}