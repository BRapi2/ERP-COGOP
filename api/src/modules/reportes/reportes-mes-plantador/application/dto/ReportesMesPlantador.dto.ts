import {
    IsInt,
    IsOptional,
    IsString,
    IsDate,
    MaxLength,
    Min
} from "class-validator";
import { Type } from "class-transformer";

export class ReportesMesPlantadorDto {
    @IsOptional()
    @IsInt({ message: "El campo 'id' debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser negativo." })
    id?: number | null;

    @IsOptional()
    @IsString({ message: "El campo 'direccion_completa' debe ser una cadena de texto." })
    @MaxLength(200, { message: "El campo 'direccion_completa' no puede exceder los 200 caracteres." })
    direccion_completa?: string | null;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: "El campo 'fecha_proyectada_mision' debe ser una fecha válida." })
    fecha_proyectada_mision?: Date | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_nuevos_contactos' debe ser un número entero." })
    @Min(0, { message: "El número de nuevos contactos no puede ser negativo." })
    nro_nuevos_contactos?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_nuevos_gdc' debe ser un número entero." })
    @Min(0, { message: "El número de nuevos GDC no puede ser negativo." })
    nro_nuevos_gdc?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_nuevas_conversiones' debe ser un número entero." })
    @Min(0, { message: "El número de nuevas conversiones no puede ser negativo." })
    nro_nuevas_conversiones?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_consolidados' debe ser un número entero." })
    @Min(0, { message: "El número de consolidados no puede ser negativo." })
    nro_consolidados?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_discipulados' debe ser un número entero." })
    @Min(0, { message: "El número de discipulados no puede ser negativo." })
    nro_discipulados?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_bautizados_agua' debe ser un número entero." })
    @Min(0, { message: "El número de bautizados en agua no puede ser negativo." })
    nro_bautizados_agua?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_nuevas_personas_gdc' debe ser un número entero." })
    @Min(0, { message: "El número de nuevas personas en GDC no puede ser negativo." })
    nro_nuevas_personas_gdc?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_nuevos_lideres_gdc' debe ser un número entero." })
    @Min(0, { message: "El número de nuevos líderes GDC no puede ser negativo." })
    nro_nuevos_lideres_gdc?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_creyentes' debe ser un número entero." })
    @Min(0, { message: "El número de creyentes no puede ser negativo." })
    nro_creyentes?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_miembros' debe ser un número entero." })
    @Min(0, { message: "El número de miembros no puede ser negativo." })
    nro_miembros?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'nro_lideres_gdc' debe ser un número entero." })
    @Min(0, { message: "El número de líderes GDC no puede ser negativo." })
    nro_lideres_gdc?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'total_personas_gdc' debe ser un número entero." })
    @Min(0, { message: "El total de personas en GDC no puede ser negativo." })
    total_personas_gdc?: number | null;

    @IsOptional()
    @IsInt({ message: "El campo 'total_personas_discipulados' debe ser un número entero." })
    @Min(0, { message: "El total de personas en discipulados no puede ser negativo." })
    total_personas_discipulados?: number | null;

    @IsOptional()
    @IsString({ message: "El campo 'visitaPastorIglesiaCentral' debe ser una cadena de texto." })
    @MaxLength(10, { message: "El campo 'visitaPastorIglesiaCentral' no puede exceder los 10 caracteres." })
    visita_pastor_iglesia_central?: string | null;

    @IsOptional()
    @IsString({ message: "El campo 'visitaSupervisorDistrital' debe ser una cadena de texto." })
    @MaxLength(10, { message: "El campo 'visitaSupervisorDistrital' no puede exceder los 10 caracteres." })
    visita_supervisor_distrital?: string | null;

    @IsOptional()
    @IsString({ message: "El campo 'comentario' debe ser una cadena de texto." })
    @MaxLength(500, { message: "El comentario no puede exceder los 500 caracteres." })
    comentario?: string | null;
}
