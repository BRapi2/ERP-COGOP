import { IsString, IsNotEmpty, MaxLength, IsInt, Min, IsOptional } from 'class-validator';

export class TipoComprobanteDto {
    
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: "El campo 'nombre' es obligatorio." })
    @IsString()
    @MaxLength(50, { message: "El 'nombre' no puede exceder los 50 caracteres." })
    nombre: string;
}
