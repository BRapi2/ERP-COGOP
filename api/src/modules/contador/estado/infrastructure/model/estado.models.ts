import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity({ name: "estado" })
export class EstadoModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    nombre: string;
    
}
