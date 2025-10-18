import { IsInt, IsNotEmpty } from "class-validator";

export class CuentasContablesDto {
    @IsNotEmpty({ message: 'El ID de la cuenta contable no puede estar vacío.' })
    @IsInt({ message: 'El ID de la cuenta contable debe ser un número entero.' })
    id: number
}