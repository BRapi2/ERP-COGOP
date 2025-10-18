import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ReportesPeriodoDto } from "./reportes-periodo.dto";

export class ReportesPeriodoDescripcionDto {

    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    nombre: string;

    @IsNotEmpty({ message: 'El campo "periodo" no puede estar vacío.' })
    @IsObject({ message: 'El campo "periodo" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ReportesPeriodoDto)
    periodo: ReportesPeriodoDto;
}
