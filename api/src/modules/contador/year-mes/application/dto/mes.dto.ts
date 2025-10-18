import { IsInt, IsNotEmpty } from "class-validator";

export class MesDto {
    @IsNotEmpty({ message: 'El ID del mes no puede estar vacío.' })
    @IsInt({ message: 'El ID del mes debe ser un número entero.' })
    id: number
}