import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested, Matches } from 'class-validator';

class MonedaIdDto {
    @IsInt({ message: "El ID de la moneda debe ser un número entero." })
    id: number;
}

export class TipoCambioDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsNotEmpty({ message: "La fecha es obligatoria." })
    @IsDateString({}, { message: "El formato de la fecha no es válido." })
    fecha: Date;

    @IsNotEmpty({ message: "La moneda de origen es obligatoria." })
    @IsObject()
    @ValidateNested()
    @Type(() => MonedaIdDto)
    monedaOrigen: MonedaIdDto;

    @IsNotEmpty({ message: "La moneda de destino es obligatoria." })
    @IsObject()
    @ValidateNested()
    @Type(() => MonedaIdDto)
    monedaDestino: MonedaIdDto;

    @IsNotEmpty({ message: "El 'tipo de cambio Compra' es obligatorio." })
    @IsString()
    @Matches(/^\d+(\.\d{1,4})?$/, { 
        message: "tipo de cambio compra debe ser un número decimal con hasta 4 decimales" 
    })
    tipoCambioCompra: string;

    @IsNotEmpty({ message: "El tipo de cambio de venta es obligatorio." })
    @IsString()
    @Matches(/^\d+(\.\d{1,4})?$/, { 
        message: "tipo de cambio venta debe ser un número decimal con hasta 4 decimales" 
    })
    tipoCambioVenta: string;
}