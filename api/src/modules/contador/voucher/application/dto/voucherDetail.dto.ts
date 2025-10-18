import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsDecimal, IsOptional, ValidateNested, IsObject } from "class-validator";
import { CuentasContablesDto } from "./cuentas_contables.dto"
import { CentroCostoDto } from "./centro_costo.dto";

export class VoucherDetailDto {

    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: 'La cuenta contable es requerida en el detalle.' })
    @IsInt()
    cuentaContableId: number;

    @IsNotEmpty({ message: 'El campo "cuenta contable" no puede estar vacío.' })
    @IsObject({ message: 'El campo "cuenta contable" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => CuentasContablesDto)
    cuentaContable: CuentasContablesDto;

    @IsNotEmpty({ message: 'El campo "centro costo" no puede estar vacío.' })
    @IsObject({ message: 'El campo "centro costo" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => CentroCostoDto)
    centroCosto?: CentroCostoDto;

    @IsNotEmpty({ message: 'El campo "debe" no puede estar vacío.' })
    @IsDecimal({ decimal_digits: '2' }, { message: "El valor de debe, debe ser un número decimal." })
    debe: number;

    @IsNotEmpty({ message: 'El campo "haber" no puede estar vacío.' })
    @IsDecimal({ decimal_digits: '2' }, { message: "El valor de haber, debe ser un número decimal." })
    haber: number;
}