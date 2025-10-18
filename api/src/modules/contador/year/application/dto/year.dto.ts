import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class YearDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El nombre del año es obligatorio." })
    @IsString({ message: "El nombre del año debe ser una cadena de texto." })
    @Length(1, 25, { message: "El nombre del año debe tener entre 1 y 25 caracteres." })
    name: string;
}
