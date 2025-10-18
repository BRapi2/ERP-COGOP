import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class TipoDocumentoDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El nombre del tipo de documento es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @Length(1, 100, { message: "El nombre debe tener entre 1 y 100 caracteres." })
    nombre: string;
}