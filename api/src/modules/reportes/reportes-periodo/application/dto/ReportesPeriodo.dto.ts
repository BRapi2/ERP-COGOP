import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ReportesPeriodoDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El nombre es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @Length(1, 45, { message: "El nombre debe tener entre 1 y 45 caracteres." })
    nombre: string;
}
