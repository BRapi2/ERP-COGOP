import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { RolModel } from "../../../rol/infraestructure/model/rol.models"

@Entity({ name: "menu" })
export class MenuModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    order: number

    @Column({ type: "varchar", length: 45 })
    nombre: string

    @Column({ type: "varchar", length: 45 })
    url: string

    @ManyToOne(() => MenuModel, (menu) => menu.children, { nullable: true })
    @JoinColumn({ name: "parent_id" })
    parent: MenuModel;

    @OneToMany(() => MenuModel, (menu) => menu.parent)
    children: MenuModel[];

    @Column()
    parent_id: number

    @Column()
    rol_id: number

    @OneToOne(() => RolModel)
    @JoinColumn({ name: 'rol_id' })
    rol: RolModel

    @Column({ type: "char", length: 15 })
    classs_change: string

    @Column({ type: "varchar", length: 40 })
    iconStyle: string

}