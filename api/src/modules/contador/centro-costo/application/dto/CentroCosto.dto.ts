import { IsString, IsNotEmpty, MaxLength, IsInt, Min, Max, IsOptional, IsPositive } from 'class-validator';
export class CentroCostoDto {

    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: "El campo 'código' es obligatorio." })
    @IsString()
    @MaxLength(10, { message: "El 'código' no puede exceder los 10 caracteres." })
    codigo: string;

    @IsNotEmpty({ message: "El campo 'nombre' es obligatorio." })
    @IsString()
    @MaxLength(50, { message: "El 'nombre' no puede exceder los 50 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: "El campo 'activo' es obligatorio." })
    @IsInt()
    @Min(1, { message: "El valor para 'activo' debe ser 1 o 2." })
    @Max(2, { message: "El valor para 'activo' debe ser 1 o 2." })
    activo: number;
}