import { IsInt, IsNotEmpty } from "class-validator";
export class IglesiaDto {
    @IsNotEmpty({ message: "El ID de la iglesia no puede estar vacío." })
    @IsInt({ message: "El ID de la iglesia debe ser un número entero." })
    id: number;
}