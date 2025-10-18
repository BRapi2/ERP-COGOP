import { IsInt, IsNotEmpty } from "class-validator";

export class YearMesDto {
    @IsNotEmpty()
    @IsInt({ message: "El Mes debe ser entero." })
    id: number
}