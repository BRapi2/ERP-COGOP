import { IsInt, IsNotEmpty, IsObject, IsOptional, ValidateNested } from "class-validator";
import { ReportesTipoDto } from "./reportesTipo.dto";
import { IglesiaDto } from "./iglesia.dto";
import { Type } from "class-transformer";

export class ReportesTipoEncargadoDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: 'El campo "reportesTipo" no puede estar vacío.' })
    @IsObject({ message: 'El campo "reportesTipo" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ReportesTipoDto)
    reportesTipo: ReportesTipoDto;

    @IsNotEmpty({ message: 'El campo "iglesia" no puede estar vacío.' })
    @IsObject({ message: 'El campo "iglesia" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => IglesiaDto)
    iglesia: IglesiaDto;

}