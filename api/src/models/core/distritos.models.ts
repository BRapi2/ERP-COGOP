import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { ProvinciaModel } from "../../modules/core/provincia/infrastructure/model/Provincia.model"


@Entity({name:"distritos"})
export class Distritos extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({ type: "varchar", length: 45})
    nombre: string

    @OneToOne(() => ProvinciaModel)
    @JoinColumn({name:'provincias_id'})
    provincias: ProvinciaModel
}