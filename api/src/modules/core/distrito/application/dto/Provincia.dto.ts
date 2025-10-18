import { IsInt, IsNotEmpty, Min } from "class-validator";

export class ProvinciaDto{
    @IsNotEmpty({ message: 'La provincia no puede estar vacío.' })
    @IsInt({ message: "La provincia debe ser un número entero." })
    @Min(0, { message: "La provincia no puede ser un número negativo." })
    id: number;
}