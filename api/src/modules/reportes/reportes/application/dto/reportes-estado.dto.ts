import { IsInt, IsNotEmpty } from "class-validator";

export class ReportesEstadoDto {
    @IsNotEmpty({ message: "El ID del estado del reporte no puede estar vacío." })
    @IsInt({ message: "El ID del estado del reporte debe ser un número entero." })
    id: number;
}