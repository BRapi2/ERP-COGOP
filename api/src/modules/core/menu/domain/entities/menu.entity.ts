import { RolDto } from "../../../rol/application/dto/Rol.dto";

export class Menu {
    private constructor(
        public readonly id: number | undefined,
        public readonly order: number,
        public readonly nombre: string,
        public readonly url: string,
        public readonly parentId: number,
        public readonly rol: RolDto,
        public readonly parent?: Menu,
        public readonly children?: Menu[],
        public readonly classsChange?: string,
        public readonly iconStyle?: string
    ) { }

    public static crear({
        id,
        order,
        nombre,
        url,
        parentId,
        rol,
        parent,
        children,
        classsChange,
        iconStyle
    }: {
        id?: number;
        order: number;
        nombre: string;
        url: string;
        parentId: number;
        rol: RolDto;
        parent?: Menu;
        children?: Menu[];
        classsChange?: string;
        iconStyle?: string;
    }): Menu {
        return new Menu(id, order, nombre, url, parentId, rol, parent, children, classsChange, iconStyle);
    }
}
