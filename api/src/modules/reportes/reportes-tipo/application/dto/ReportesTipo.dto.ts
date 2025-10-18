import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ReportesPeriodoDto } from "./reportes-periodo.dto";

export class ReportesTipoDto {
    @IsOptional()
    @IsInt({ message: 'El ID debe ser un número entero.' })
    id?: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    nombre: string;

    @IsNotEmpty({ message: 'El periodo es obligatorio.' })
    @ValidateNested()
    @Type(() => ReportesPeriodoDto)
    periodo: ReportesPeriodoDto;
}