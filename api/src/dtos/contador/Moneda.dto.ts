
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength, IsInt, IsObject, ValidateNested } from 'class-validator';

class TipoCambio {
    @IsInt()
    id: number;
}

export class MonedaDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsNotEmpty({ message: "El código de moneda es obligatorio." })
    @IsString()
    @Length(3, 3, { message: "El código de moneda debe tener exactamente 3 caracteres." })
    codigoMoneda: string;

    @IsNotEmpty({ message: "El nombre de moneda es obligatorio." })
    @IsString()
    @MaxLength(50, { message: "El nombre de moneda no puede exceder los 50 caracteres." })
    nombreMoneda: string;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => TipoCambio)
    tiposCambioOrigen: TipoCambio;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => TipoCambio)
    tiposCambioDestino: TipoCambio;
}