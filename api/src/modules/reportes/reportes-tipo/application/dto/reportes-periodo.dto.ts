import { IsInt, IsNotEmpty } from "class-validator";

export class ReportesPeriodoDto {
    @IsNotEmpty({ message: 'El ID del periodo es obligatorio.' })
    @IsInt({ message: 'El ID del periodo debe ser un número entero.' })
    id: number;
}