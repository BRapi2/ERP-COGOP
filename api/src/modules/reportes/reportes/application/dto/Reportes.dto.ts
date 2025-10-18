import { IsEmail, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ReportesTipoDto } from "./reportes-tipo.dto";
import { ReportesPeriodoDescripcionDto } from "./reportes-periodo-descripcion.dto";
import { ReportesEstadoDto } from "./reportes-estado.dto";
import { IglesiaDto } from "./iglesia.dto";
import { ReportesMesPlantadorDto } from "../../../reportes-mes-plantador/application/dto/ReportesMesPlantador.dto";

export class ReportesDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: 'El campo "tipo de reporte" es obligatorio.' })
    @IsObject({ message: 'El campo "tipo de reporte" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ReportesTipoDto)
    reportesTipo: ReportesTipoDto;

    @IsNotEmpty({ message: 'El campo "periodo de descripción" es obligatorio.' })
    @IsObject({ message: 'El campo "periodo de descripción" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ReportesPeriodoDescripcionDto)
    reportesPeriodoDescripcion: ReportesPeriodoDescripcionDto;

    @IsNotEmpty({ message: 'El campo "año" es obligatorio.' })
    @IsInt({ message: 'El campo "año" debe ser un número entero.' })
    year: number;

    @IsNotEmpty({ message: 'El campo "nombres" es obligatorio.' })
    @IsString({ message: 'El campo "nombres" debe ser una cadena de texto.' })
    @MaxLength(45, { message: 'El campo "nombres" no debe superar los 45 caracteres.' })
    nombres: string;

    @IsNotEmpty({ message: 'El campo "apellidos" es obligatorio.' })
    @IsString({ message: 'El campo "apellidos" debe ser una cadena de texto.' })
    @MaxLength(45, { message: 'El campo "apellidos" no debe superar los 45 caracteres.' })
    apellidos: string;

    @IsNotEmpty({ message: 'El campo "teléfono" es obligatorio.' })
    telefono: string;

    @IsNotEmpty({ message: 'El campo "email" es obligatorio.' })
    @IsEmail({}, { message: 'El campo "email" debe ser un email válido.' })
    email: string;

    @IsNotEmpty({ message: 'El campo "dirección" es obligatorio.' })
    @IsString({ message: 'El campo "dirección" debe ser una cadena de texto.' })
    direccion: string;

    @IsOptional()
    @IsObject({ message: 'El campo "estado del reporte" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ReportesEstadoDto)
    reportesEstado?: ReportesEstadoDto;

    data?: number

    @IsOptional()
    @IsObject({ message: 'El campo "reporte mes plantador" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ReportesMesPlantadorDto)
    reportesMesPlantador?: ReportesMesPlantadorDto;

    @IsNotEmpty({ message: 'El campo "iglesia" es obligatorio.' })
    @IsObject({ message: 'El campo "iglesia" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => IglesiaDto)
    iglesia: IglesiaDto;
}
