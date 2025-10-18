import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class OrigenDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El código es obligatorio." })
    @IsString({ message: "El código debe ser una cadena de texto." })
    @Length(1, 3, { message: "El código debe tener entre 1 y 3 caracteres." })
    codigo: string;

    @IsNotEmpty({ message: "El nombre es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @Length(1, 40, { message: "El nombre debe tener entre 1 y 40 caracteres." })
    nombre: string;
}
