import { IsInt, Min, IsNotEmpty } from "class-validator";


export class DepartamentoDto {
    @IsNotEmpty({ message: 'El ID no puede estar vacío.' })
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id: number;
}