// src/modules/contador/proveedor/infrastructure/model/proveedor.model.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { TipoProveedorModel } from "../../../tipo-proveedor/infrastructure/model/TipoProveedor.model";
import { TipoDocumentoModel } from "../../../tipo-documento/infrastructure/model/TipoDocumento.model";

@Entity({ name: "proveedores" })
export class ProveedorModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11, nullable: false })
    ruc: string;

    @Column({ length: 250, nullable: false })
    nombre: string;

    @Column({ length: 250, nullable: true })
    direccion: string;

    @ManyToOne(() => TipoProveedorModel, { nullable: false })
    @JoinColumn({ name: "tipo_proveedor_id" })
    tipoProveedor: TipoProveedorModel;

    @ManyToOne(() => TipoDocumentoModel, { nullable: false })
    @JoinColumn({ name: "tipos_documentos_id" })
    tipoDocumento: TipoDocumentoModel;
}