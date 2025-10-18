import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({ name: "estado" })
export class EstadoModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string
}