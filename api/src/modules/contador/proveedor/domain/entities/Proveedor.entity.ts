import { TipoDocumentoDto } from "../../application/dto/TipoDocumento.dto";
import { TipoProveedorDto } from "../../application/dto/TipoProveedor.dto";

export class ProveedorEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly ruc: string,
        public readonly nombre: string,
        public readonly direccion: string | undefined,
        public readonly tipoProveedor: TipoProveedorDto,
        public readonly tipoDocumento: TipoDocumentoDto
    ) { }

    public static crear(props: {
        id?: number;
        ruc: string;
        nombre: string;
        direccion?: string;
        tipoProveedor: TipoProveedorDto;
        tipoDocumento: TipoDocumentoDto;
    }): ProveedorEntity {
        return new ProveedorEntity(
            props.id,
            props.ruc,
            props.nombre,
            props.direccion,
            props.tipoProveedor,
            props.tipoDocumento
        );
    }
}