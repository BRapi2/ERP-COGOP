import { IsInt, IsNotEmpty } from "class-validator";

export class ProveedorDto {
    @IsNotEmpty({ message: 'El ID del proveedor no puede estar vacío.' })
    @IsInt({ message: 'El ID del proveedor debe ser un número entero.' })
    id: number
}