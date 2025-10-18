import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EstadoDto {
    @IsOptional()
    @IsInt({ message: 'El ID debe ser un número entero.' })
    id?: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    nombre: string;
}
