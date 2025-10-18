import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { PerfilModel } from "../../../perfil/infraestructure/model/perfil.models";
import { RolModel } from "../../../rol/infraestructure/model/rol.models";
import { EstadoModel } from "../../../estado/infraestructure/model/estado.models";
import { IglesiaModel } from "../../../iglesia/infraestructure/model/iglesia.models";

@Entity({ name: "user" })
export class UsuarioModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number



    @Column({ type: "varchar", length: 100 })
    username: string

    @Column({ type: "varchar", length: 150 })
    password: string

    @Column({ type: "varchar", length: 100 })
    imagen: string

    @ManyToOne(() => EstadoModel)
    @JoinColumn({ name: 'estado_id' })
    estado: EstadoModel;

    @ManyToOne(() => RolModel)
    @JoinColumn({ name: 'rol_id' })
    rol: RolModel;

    @OneToOne(() => PerfilModel, {
        cascade: ['insert', 'update'],
        eager: true,
    })
    @JoinColumn({ name: 'perfil_id' })
    perfil: PerfilModel

    @ManyToOne(() => IglesiaModel)
    @JoinColumn({ name: 'iglesia_id' })
    iglesia: IglesiaModel

    @Column({ type: "varchar", length: 45, name: "ministerio" })
    ministerio: string

    @Column({ type: "varchar", length: 120, name: "mision" })
    mision: string
}