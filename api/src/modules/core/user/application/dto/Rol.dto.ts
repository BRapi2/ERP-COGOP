import { IsInt, IsNotEmpty } from "class-validator";
export class RolDto {
    @IsNotEmpty({ message: "El ID del rol no puede estar vacío." })
    @IsInt({ message: "El ID del rol debe ser un número entero." })
    id: number;
}