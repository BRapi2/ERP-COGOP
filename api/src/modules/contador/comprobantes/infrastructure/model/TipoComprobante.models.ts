import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "tipos_comprobantes" })
export class TipoComprobanteModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false })
    nombre: string;

}
