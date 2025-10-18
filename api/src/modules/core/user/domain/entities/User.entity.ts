import { PerfilDto } from "../../application/dto/Perfil.dto";
import { RolDto } from "../../application/dto/Rol.dto";
import { EstadoDto } from "../../application/dto/Estado.dto";
import { IglesiaDto } from "../../application/dto/Iglesia.dto";

export class UserEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly username: string,
        public readonly password: string,
        public readonly perfil: PerfilDto,
        public readonly rol: RolDto,
        public readonly estado: EstadoDto,
        public readonly imagen: string | null,
        public readonly iglesia: IglesiaDto | undefined,
        public readonly ministerio: string | null,
        public readonly mision: string | null,
    ) { }

    public static crear(props: {
        id?: number;
        username: string;
        password: string;
        perfil: PerfilDto;
        rol: RolDto;
        estado: EstadoDto;
        imagen?: string | null;
        iglesia?: IglesiaDto;
        ministerio?: string | null;
        mision?: string | null;
    }): UserEntity {
        return new UserEntity(
            props.id,
            props.username,
            props.password,
            props.perfil,
            props.rol,
            props.estado,
            props.imagen ?? null,
            props.iglesia,
            props.ministerio ?? null,
            props.mision ?? null,
        );
    }
}