import { IsInt, IsNotEmpty } from "class-validator";

export class TipoComprobanteDto {
    @IsNotEmpty({ message: 'El ID del Tipo Comprobante  no puede estar vacío.' })
    @IsInt({ message: 'El ID del Tipo Comprobante debe ser un número entero.' })
    id: number
}