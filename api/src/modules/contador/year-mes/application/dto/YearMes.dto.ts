import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, IsOptional, ValidateNested } from "class-validator";
import { MesDto } from "./mes.dto";
import { YearDto } from "./year.dto";

export class YearMesDto {

    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number

    @IsNotEmpty({  message: 'El campo "mes" no puede estar vacío.'  })
    @IsObject({  message: 'El campo "mes" debe ser un objeto válido.'  })
    @ValidateNested()
    @Type(() => MesDto)
    mes: MesDto;

    @IsNotEmpty({  message: 'El campo "año" no puede estar vacío.'  })
    @IsObject({  message: 'El campo "año" debe ser un objeto válido.'  })
    @ValidateNested()
    @Type(() => YearDto)
    year: YearDto;

}