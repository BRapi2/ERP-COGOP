import { IsInt } from "class-validator";

export class TipoProveedorDto{
    @IsInt({ message: "El ID debe ser un número entero." })
    id: number;
}