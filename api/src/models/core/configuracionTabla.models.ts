import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm"
import { MenuModel } from "../../modules/core/menu/infraestructure/model/menu.models"

@Entity({name:"configuracion_tabla"})
export class configuracionTabla extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number 

    @Column({ name: "total_datos", type: "int"})
    total_datos: number

    @OneToOne( ()=> MenuModel )
    @JoinColumn({ name: "menu_id" })
    menu_id:MenuModel
    
}
