import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "origenes" })
export class OrigenModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 3, nullable: false })
    codigo: string;

    @Column({ length: 40, nullable: false })
    nombre: string;
}
