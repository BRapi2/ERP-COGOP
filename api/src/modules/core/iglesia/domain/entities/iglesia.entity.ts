import { DistritoDto } from "../../application/dto/distrito.dto";
import { EstadoDto } from "../../application/dto/estado.dto";

export class IglesiaEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly nombre_corto: string,
        public readonly telefono_fijo: string,
        public readonly telefono_celular: string,
        public readonly email: string,
        public readonly fecha_organizacion: string,
        public readonly fecha_inicio_reporte: string,
        public readonly distrito: DistritoDto,
        public readonly direccion: string,
        public readonly estado: EstadoDto,
        public readonly observacion: string,
    ) { }

    public static crear({
        id,
        nombre,
        nombre_corto,
        telefono_fijo,
        telefono_celular,
        email,
        fecha_organizacion,
        fecha_inicio_reporte,
        distrito,
        direccion,
        estado,
        observacion,
    }: {
        id?: number;
        nombre: string;
        nombre_corto: string;
        telefono_fijo: string;
        telefono_celular: string;
        email: string;
        fecha_organizacion: string;
        fecha_inicio_reporte: string;
        distrito: DistritoDto;
        direccion: string;
        estado: EstadoDto;
        observacion: string;
    }): IglesiaEntity {
        return new IglesiaEntity(
            id,
            nombre,
            nombre_corto,
            telefono_fijo,
            telefono_celular,
            email,
            fecha_organizacion,
            fecha_inicio_reporte,
            distrito,
            direccion,
            estado,
            observacion,
        );
    }
}
