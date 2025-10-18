import { IsInt, IsNotEmpty } from "class-validator";

export class ReportesTipoDto {
    @IsNotEmpty({ message: "El ID del tipo de reporte no puede estar vacío." })
    @IsInt({ message: "El ID del tipo de reporte debe ser un número entero." })
    id: number;
}