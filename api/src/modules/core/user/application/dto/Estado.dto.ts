import { IsInt, IsNotEmpty } from "class-validator";
export class EstadoDto {
    @IsNotEmpty({ message: "El ID del estado no puede estar vacío." })
    @IsInt({ message: "El ID del estado debe ser un número entero." })
    id: number;
}