import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, IsOptional, ValidateNested, IsString, Matches, MaxLength, MinLength, IsEmail, Min } from "class-validator";
import { Transform } from "class-transformer";
import { DistritoDto } from "./distrito.dto";
import { EstadoDto } from "./estado.dto";

export class IglesiaDto {

    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: 'El campo "nombre" no puede estar vacío.' })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @Matches(/^[a-zA-Z0-9\s.,#-]+$/, { message: "El nombre solo puede contener letras, números, espacios, punto, coma, guion y signo de número." })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @MaxLength(45, { message: "El nombre no puede exceder los 45 caracteres." })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: 'El campo "nombre corto" no puede estar vacío.' })
    @IsString({ message: "El nombre corto debe ser una cadena de texto." })
    @Matches(/^[a-zA-Z0-9\s]+$/, { message: "El nombre corto solo puede contener letras, números y espacios." })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @MaxLength(45, { message: "El nombre corto no puede exceder los 45 caracteres." })
    @MinLength(3, { message: "El nombre corto debe tener al menos 3 caracteres." })
    nombre_corto: string;

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    telefono_fijo: string;

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    telefono_celular: string;

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @IsEmail({}, { message: 'El formato del email no es válido.' })
    @MaxLength(60, { message: 'El email no puede exceder los 60 caracteres.' })
    email: string;

    @IsOptional()
    @IsString({ message: 'El campo "fecha organización" debe ser una cadena de texto.' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'El formato de la fecha organización debe ser AAAA-MM-DD.',
    })
    fecha_organizacion: string;

    @IsOptional()
    @IsString({ message: 'El campo "fecha inicio reporte" debe ser una cadena de texto.' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'El formato de la fecha inicio reporte debe ser AAAA-MM-DD.',
    })
    fecha_inicio_reporte: string;

    @IsNotEmpty({ message: 'El campo "distrito" no puede estar vacío.' })
    @IsObject({ message: 'El campo "distrito" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => DistritoDto)
    distrito: DistritoDto;

    @IsOptional()
    @IsString({ message: "La dirección debe ser una cadena de texto." })
    @Matches(/^[a-zA-Z0-9\s.,#-]+$/, { message: "La dirección solo puede contener letras, números, espacios, punto, coma, guion y signo de número." })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @MaxLength(150, { message: "La dirección no puede exceder los 150 caracteres." })
    @MinLength(3, { message: "La dirección debe tener al menos 3 caracteres." })
    direccion: string;

    @IsNotEmpty({ message: 'El campo "estado" no puede estar vacío.' })
    @IsObject({ message: 'El campo "estado" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => EstadoDto)
    estado: EstadoDto;

    @IsOptional()
    @IsString({ message: "La observación debe ser una cadena de texto." })
    @Matches(/^[a-zA-Z0-9\s.,#-]+$/, { message: "La observación solo puede contener letras, números, espacios, punto, coma, guion y signo de número." })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @MaxLength(100, { message: "La observación no puede exceder los 100 caracteres." })
    @MinLength(3, { message: "La observación debe tener al menos 3 caracteres." })
    observacion: string;
}
