import { IsInt, IsNotEmpty } from "class-validator";

export class ReportesPeriodoDescripcionDto {
    @IsNotEmpty({ message: "El ID del periodo de descripción no puede estar vacío." })
    @IsInt({ message: "El ID del periodo de descripción debe ser un número entero." })
    id: number;
}