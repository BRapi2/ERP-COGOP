import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class OrigenDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: "El código es obligatorio." })
    @IsString()
    @MaxLength(3, { message: "El código no puede exceder los 3 caracteres." })
    codigo: string;

    @IsNotEmpty({ message: "El nombre es obligatorio." })
    @IsString()
    @MaxLength(40, { message: "El nombre no puede exceder los 40 caracteres." })
    nombre: string;
}