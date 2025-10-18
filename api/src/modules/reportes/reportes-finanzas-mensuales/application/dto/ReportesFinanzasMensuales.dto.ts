import { IsOptional, IsInt, Min, IsDate, IsString, MaxLength, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class ReportesFinanzasMensualesDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    id?: number | null;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    fecha?: Date | null;

    @IsOptional()
    @IsNumber()
    ingresos?: number | null;

    @IsOptional()
    @IsNumber()
    egresos?: number | null;

    @IsOptional()
    @IsNumber()
    saldo_final?: number | null;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    responsable?: string | null;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    tipo_ingreso?: string | null;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    tipo_egreso?: string | null;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    metodo_pago?: string | null;

    @IsOptional()
    @IsNumber()
    donaciones?: number | null;

    @IsOptional()
    @IsNumber()
    gastos_actividad?: number | null;

    @IsOptional()
    @IsString()
    observaciones?: string | null;

    @IsOptional()
    @IsString()
    comentarios?: string | null;
}
