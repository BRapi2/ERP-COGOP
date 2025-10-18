import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "perfil" })
export class PerfilModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 70 })
    nombre: string;

    @Column({ type: "varchar", length: 70 })
    apellido: string;
}