import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";
import { YearMesDto } from "./YearMes.dto";

export class TipoCambioCierreDto {
    @IsOptional()
    id?: number;

    @IsNotEmpty({ message: "El año-mes es obligatorio." })
    @ValidateNested()
    @Type(() => YearMesDto)
    yearMes: YearMesDto;

    @IsNotEmpty({ message: "El tipo de cambio de compra es obligatorio." })
    @IsString()
    @Matches(/^\d+(\.\d{1,4})?$/, {
        message: "La compra debe ser un número decimal con hasta 4 decimales"
    })
    compra: string;

    @IsNotEmpty({ message: "El tipo de cambio de venta es obligatorio." })
    @IsString()
    @Matches(/^\d+(\.\d{1,4})?$/, {
        message: "La venta debe ser un número decimal con hasta 4 decimales"
    })
    venta: string;
}