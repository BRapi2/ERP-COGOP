import { Menu } from "../../domain/entities/menu.entity";
import { MenuModel } from "../model/menu.models";

export class MenuMapping {
    public static toEntity(model: MenuModel): Menu {
        if (!model) throw new Error('Modelo no puede ser nulo');

        return Menu.crear({
            id: model.id,
            order: model.order,
            nombre: model.nombre,
            url: model.url,
            parentId: model.parent_id,
            parent: model.parent ? MenuMapping.toEntity(model.parent) : undefined,
            rol: model.rol,
            classsChange: model.classs_change,
            iconStyle: model.iconStyle
        });
    }

    public static toModel(entity: Menu): MenuModel {
        if (!entity) throw new Error('Entidad no puede ser nula');

        const model = new MenuModel();
        model.id = entity.id;
        model.order = entity.order;
        model.nombre = entity.nombre;
        model.url = entity.url;
        model.parent_id = entity.parentId;

        if (!entity.rol?.id) {
            throw new Error('Rol ID es requerido');
        }

        model.rol = entity.rol as any;

        model.classs_change = null;
        model.iconStyle = null;

        return model;
    }
}
