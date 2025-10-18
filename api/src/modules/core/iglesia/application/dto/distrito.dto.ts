import { IsInt, IsNotEmpty, Min } from "class-validator";

export class DistritoDto {
    @IsNotEmpty({ message: 'El ID del distrito no puede estar vacío.' })
    @IsInt({ message: 'El ID del distrito debe ser un número entero.' })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id: number;
}
