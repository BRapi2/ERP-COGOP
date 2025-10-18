import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { RolModel } from "../../modules/core/rol/infraestructure/model/rol.models"
import { EstadoModel } from '../../modules/core/estado/infraestructure/model/estado.models'
import { IglesiaModel } from "../../modules/core/iglesia/infraestructure/model/iglesia.models"
import { PerfilModel } from "../../modules/core/perfil/infraestructure/model/perfil.models"

@Entity({ name: "user" })
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 150 })
    username: string

    @Column({ type: "varchar", length: 100 })
    password: string

    @Column({ type: "varchar", length: 100 })
    imagen: string

    @ManyToOne(() => EstadoModel)
    @JoinColumn({ name: 'estado_id' })
    estado: EstadoModel;

    @Column({ name: 'estado_id', nullable: true })
    estado_id: number;

    @ManyToOne(() => RolModel)
    @JoinColumn({ name: 'rol_id' })
    rol: RolModel;

    @Column({ name: 'rol_id', nullable: true })
    rol_id: number;

    @OneToOne(() => PerfilModel, {
        cascade: ['insert', 'update'],
        eager: true,
    })
    @JoinColumn({ name: 'perfil_id' })
    perfil: PerfilModel

    @ManyToOne(() => IglesiaModel)
    @JoinColumn({ name: 'iglesia_id' })
    iglesia: IglesiaModel

    @Column({ name: 'iglesia_id', nullable: true })
    iglesia_id: number;

    @Column({ type: "varchar", length: 45, name: "ministerio" })
    ministerio: string

    @Column({ type: "varchar", length: 120, name: "mision" })
    mision: string

}
