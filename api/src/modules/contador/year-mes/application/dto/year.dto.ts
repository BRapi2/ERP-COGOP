import { IsInt, IsNotEmpty } from "class-validator";

export class YearDto {
    @IsNotEmpty({ message: 'El ID del año no puede estar vacío.' })
    @IsInt({ message: 'El ID del año debe ser un número entero.' })
    id: number
}