import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, IsOptional, ValidateNested } from "class-validator";
import { MesDto } from "./mes.dto";
import { YearDto } from "./year.dto";
import { OrigenDto } from "./origen.dto";

export class FindOrCreateVoucherDto {
    @IsNotEmpty({ message: 'El origen no puede estar vacío.' })
    @ValidateNested()
    @Type(() => OrigenDto)
    origen: OrigenDto;

    @IsNotEmpty({ message: 'El mes no puede estar vacío.' })
    @ValidateNested()
    @Type(() => MesDto)
    mes: MesDto;
    
    @IsNotEmpty({ message: 'El año no puede estar vacío.' })
    @ValidateNested()
    @Type(() => YearDto)
    year: YearDto;

    @IsOptional()
    @IsInt({ message: "El número de asiento debe ser un número entero." })
    nAsiento?: number;
}