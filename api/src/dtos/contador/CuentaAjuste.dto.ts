import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min, MaxLength, ValidateNested } from 'class-validator';
class YearDto {
    @IsInt()
    id: number;
}
export class CuentaAjusteDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString()
    @MaxLength(45, { message: "El 'nombre' no puede exceder los 45 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: 'El valor no puede estar vacío.' })
    @IsString()
    @MaxLength(5, { message: "El 'valor' no puede exceder los 5 caracteres." })
    valor: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => YearDto)
    year: YearDto;
}