import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "centros_costo" })
export class CentroCostoModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10, unique: true, nullable: false })
    codigo: string;

    @Column({ length: 50, nullable: false })
    nombre: string;

    @Column({ type: "int", nullable: false })
    activo: number;
}
