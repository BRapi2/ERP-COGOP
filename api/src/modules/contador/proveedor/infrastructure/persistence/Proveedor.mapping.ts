import { ProveedorEntity } from "../../domain/entities/Proveedor.entity";
import { ProveedorModel } from "../model/Proveedor.model";

export class ProveedorMapping {
    public static toEntity(model: ProveedorModel): ProveedorEntity {
        return ProveedorEntity.crear({
            id: model.id,
            ruc: model.ruc,
            nombre: model.nombre,
            direccion: model.direccion,
            tipoProveedor: model.tipoProveedor,
            tipoDocumento: model.tipoDocumento
        });
    }

    public static toModel(entity: ProveedorEntity): ProveedorModel {
        const model = new ProveedorModel();
        model.id = entity.id;
        model.ruc = entity.ruc;
        model.nombre = entity.nombre;
        model.direccion = entity.direccion;
        
        if (!entity.tipoProveedor.id) {
            throw new Error('Tipo de proveedor es requerido');
        }
        model.tipoProveedor = entity.tipoProveedor as any;
        
        if (!entity.tipoDocumento.id) {
            throw new Error('Tipo de documento es requerido');
        }
        model.tipoDocumento = entity.tipoDocumento as any;
        
        return model;
    }
}