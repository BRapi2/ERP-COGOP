import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt, MinLength, ValidateNested, IsObject, Matches, Min } from "class-validator";
import { DepartamentoDto } from "./Departamento.dto";
import { Type, Transform } from "class-transformer";


export class ProvinciaDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: "El nombre es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @MaxLength(45, { message: "El nombre no puede exceder los 45 caracteres." })
    @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres." })
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
    @Matches(/^[a-zA-Z0-9\s.,#-]+$/, { message: "El nombre solo puede contener letras, números y espacios." })
    nombre: string;

    @IsNotEmpty({ message: "El Idepartamento es obligatorio." })
    @IsObject({ message: 'El campo "departamento" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => DepartamentoDto)
    departamento: DepartamentoDto;
}