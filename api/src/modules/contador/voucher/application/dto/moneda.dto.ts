import { IsInt, IsNotEmpty } from "class-validator";

export class MonedaDto {
    @IsNotEmpty({ message: 'El ID de la Moneda no puede estar vacío.' })
    @IsInt({ message: 'El ID de la Moneda debe ser un número entero.' })
    id: number
}