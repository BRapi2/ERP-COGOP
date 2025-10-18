import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested, Matches } from 'class-validator';

class PerfilDto {

    @IsNotEmpty({ message: "El campo 'nombre' es obligatorio." })
    @IsString()
    @MaxLength(70, { message: "El 'nombre' no puede exceder los 70 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: "El campo 'apellido' es obligatorio." })
    @IsString()
    @MaxLength(70, { message: "El 'apellido' no puede exceder los 70 caracteres." })
    apellido: string;
}
class EstadoDto {
    @IsInt()
    id: number;
}
class RolDto {
    @IsInt()
    id: number;
}
class IglesiaDto {
    @IsInt()
    id: number;
}
class DistritosCogopDto {
    @IsInt()
    id: number;
}
class AreaDto {
    @IsInt()
    id: number;
}
export class UsuarioDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: 'El nombre de usuario (email) es obligatorio.' })
    @IsEmail({}, { message: 'El formato del nombre de usuario debe ser un email válido.' })
    @MaxLength(150)
    username: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número o símbolo.' })
    password?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    imagen?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => EstadoDto)
    estado: EstadoDto;

    estado_id: number;

    @IsObject()
    @ValidateNested()
    @Type(() => RolDto)
    rol: RolDto;

    rol_id: number;

    @IsObject()
    @ValidateNested()
    @Type(() => PerfilDto)
    perfil: PerfilDto;

    @IsObject()
    @ValidateNested()
    @Type(() => IglesiaDto)
    iglesia: IglesiaDto;

    iglesia_id?: number;

    @IsObject()
    @ValidateNested()
    @Type(() => DistritosCogopDto)
    distrito: DistritosCogopDto;

    distrito_id?: number;

    @IsOptional()
    @IsInt()
    persona_id?: number;

    @IsOptional()
    @IsString()
    @MaxLength(45)
    ministerio?: string;

    @IsOptional()
    @IsString()
    @MaxLength(120)
    mision?: string;

    @IsObject()
    @ValidateNested()
    @Type(() => AreaDto)
    area: AreaDto;

    area_id?: number;
}