import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "rol" })
export class RolModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, nullable: false })
    nombre: string;

    @Column({ length: 45, nullable: false })
    descripcion: string;

}
