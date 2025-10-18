import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class MesDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El nombre del mes es obligatorio." })
    @IsString({ message: "El nombre del mes debe ser una cadena de texto." })
    @Length(1, 45, { message: "El nombre del mes debe tener entre 1 y 45 caracteres." })
    name: string;
}
