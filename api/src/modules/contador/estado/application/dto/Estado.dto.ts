import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt } from "class-validator";

export class EstadoDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El nombre es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @MaxLength(50, { message: "El nombre no puede exceder los 50 caracteres." })
    nombre: string;
}