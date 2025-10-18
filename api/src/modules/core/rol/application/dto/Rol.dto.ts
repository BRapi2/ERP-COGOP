import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class RolDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsOptional()
    @IsString()
    @MaxLength(30, { message: "El 'nombre' no puede exceder los 30 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
    @IsOptional()
    @IsString()
    @MaxLength(45, { message: "La 'descripción' no puede exceder los 45 caracteres." })
    descripcion: string;
}
