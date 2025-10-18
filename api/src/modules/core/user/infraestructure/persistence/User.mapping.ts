import { UserEntity } from "../../domain/entities/User.entity";
import { UsuarioModel } from "../model/User.models";

export class UserMapping {
    public static toEntity(model: UsuarioModel): UserEntity {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }

        return UserEntity.crear({
            id: model.id,
            username: model.username,
            password: model.password,
            perfil: model.perfil as any,
            rol: model.rol as any,
            estado: model.estado as any,
            imagen: model.imagen ?? null,
            iglesia: model.iglesia as any,
            ministerio: model.ministerio ?? null,
            mision: model.mision ?? null,
        });
    }

    public static toModel(entity: UserEntity): UsuarioModel {
        if (!entity) {
            throw new Error('Entidad no puede ser nula');
        }

        const model = new UsuarioModel();
        model.id = entity.id;
        model.username = entity.username;
        model.password = entity.password;
        model.perfil = entity.perfil as any;
        model.rol = entity.rol as any;
        model.estado = entity.estado as any;
        model.imagen = entity.imagen ?? null;
        model.iglesia = entity.iglesia as any;
        model.ministerio = entity.ministerio ?? null;
        model.mision = entity.mision ?? null;
        return model;
    }
}
