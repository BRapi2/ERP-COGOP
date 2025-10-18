import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsObject, IsOptional, MaxLength, Min, ValidateNested } from 'class-validator';

class MiembrosEstadosCivilDto {
    @IsInt()
    id: number;
}
class TipoDocumentoDto {
    @IsInt()
    id: number;
}
class MiembrosSexoDto {
    @IsInt()
    id: number;
}
class MiembrosEstadosDto {
    @IsInt()
    id: number;
}


export class PersonDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsObject()
    @ValidateNested()
    @Type(() => TipoDocumentoDto)
    tipo_documento: TipoDocumentoDto;

    @IsNotEmpty({ message: 'El número de documento es obligatorio.' })
    @MaxLength(14, { message: "El número de documento debe ser máximo de 14 caracteres" })
    nro_documento: string;

    @MaxLength(11, { message: "La fecha de nacimiento debe ser máximo de 11 caracteres" })
    fecha_nacimiento?: string;

    @IsNotEmpty({ message: 'El apellido materno es obligatorio.' })
    @MaxLength(45, { message: "El apellido materno debe ser máximo de 45 caracteres" })
    apellido_materno: string;

    @IsNotEmpty({ message: 'El apellido paterno es obligatorio.' })
    @MaxLength(45, { message: "El apellido paterno debe ser máximo de 45 caracteres" })
    apellido_paterno: string;

    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @MaxLength(45, { message: "El nombre debe ser máximo de 45 caracteres" })
    nombres: string;

    @IsObject()
    @ValidateNested()
    @Type(() => MiembrosSexoDto)
    sexo: MiembrosSexoDto;

    @MaxLength(20, { message: "El teléfono debe ser máximo de 20 caracteres" })
    telefono?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => MiembrosEstadosDto)
    estado: MiembrosEstadosDto;

    @IsEmail({}, { message: 'El formato debe ser un email válido.' })
    @MaxLength(50)
    email?: string;

    @MaxLength(12, { message: "El teléfono fijo debe ser máximo de 12 caracteres" })
    telefono_fijo?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => MiembrosEstadosCivilDto)
    estado_civil: MiembrosEstadosCivilDto;

}