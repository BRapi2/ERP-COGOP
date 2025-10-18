import { IsInt, IsNotEmpty } from "class-validator";

export class CentroCostoDto {
    @IsNotEmpty({ message: 'El ID del centro de costo no puede estar vacío.' })
    @IsInt({ message: 'El ID del centro de costo debe ser un número entero.' })
    id: number
}