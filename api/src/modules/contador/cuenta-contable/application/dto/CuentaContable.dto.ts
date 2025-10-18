import { IsNotEmpty, IsString, MaxLength, IsOptional, IsBoolean, IsEnum } from "class-validator";
import { TipoSaldo } from "../../infrastructure/model/CuentaContable.model";

export class CuentaContableDto {
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    @MaxLength(15)
    codigoCuenta?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombreCuenta: string;

    @IsOptional()
    nivel?: number;

    @IsNotEmpty()
    @IsEnum(TipoSaldo)
    tipoSaldo: TipoSaldo;

    @IsNotEmpty()
    @IsBoolean()
    permiteMovimiento: boolean;
}