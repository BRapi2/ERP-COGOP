import { IsInt, IsNotEmpty } from "class-validator";
export class PerfilDto {
    @IsNotEmpty({ message: "El ID del perfil no puede estar vacío." })
    @IsInt({ message: "El ID del perfil debe ser un número entero." })
    id: number;
}