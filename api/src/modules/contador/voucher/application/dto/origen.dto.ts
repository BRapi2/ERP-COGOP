import { IsInt, IsNotEmpty } from "class-validator";

export class OrigenDto {
    @IsNotEmpty({ message: 'El ID del origen no puede estar vacío.' })
    @IsInt({ message: 'El ID del origen debe ser un número entero.' })
    id: number
}