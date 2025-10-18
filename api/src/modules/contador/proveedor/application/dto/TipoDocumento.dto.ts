import { IsInt } from "class-validator";

export class TipoDocumentoDto{
    @IsInt({ message: "El ID debe ser un número entero." })
    id: number;
}