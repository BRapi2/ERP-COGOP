import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested, Min, Matches } from 'class-validator';

class YearMesDto {
    @IsInt({ message: "El ID de 'Año y Mes' debe ser un número entero." })
    id: number;
}

export class TipoCambioCierreDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: "El campo 'Año y Mes' es obligatorio." })
    @IsObject()
    @ValidateNested()
    @Type(() => YearMesDto)
    yearMes: YearMesDto;

    @IsNotEmpty({ message: "El valor de 'Compra' es obligatorio." })
    @IsString()
    @Matches(/^\d+(\.\d{1,4})?$/, { 
        message: "Compra debe ser un número decimal con hasta 4 decimales" 
    })
    compra: string;

    @IsNotEmpty({ message: "El valor de 'Venta' es obligatorio." })
    @IsString()
    @Matches(/^\d+(\.\d{1,4})?$/, {
        message: "Venta debe ser un número decimal con hasta 4 decimales"
    })
    venta: string;
}