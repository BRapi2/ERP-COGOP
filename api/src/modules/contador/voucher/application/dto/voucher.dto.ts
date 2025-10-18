import { Type } from "class-transformer";
import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ValidateNested, IsArray } from "class-validator";
import { MesDto } from "./mes.dto";
import { YearDto } from "./year.dto";
import { OrigenDto } from "./origen.dto";
import { MonedaDto } from "./moneda.dto";
import { ProveedorDto } from "./proveedor.dto";
import { TipoComprobanteDto } from "./tipo_comprobante.dto";
import { VoucherDetailDto } from "./voucherDetail.dto";

export class VoucherDto {

    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: 'El campo "origen" no puede estar vacío.' })
    @IsObject({ message: 'El campo "origen" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => OrigenDto)
    origen: OrigenDto;

    @IsNotEmpty({ message: 'El asiento debe tener al menos un detalle.' })
    @IsArray({ message: 'Los detalles deben ser un arreglo.' })
    @ValidateNested({ each: true })
    @Type(() => VoucherDetailDto)
    detalles: VoucherDetailDto[];

    @IsNotEmpty({ message: 'El campo "mes" no puede estar vacío.' })
    @IsObject({ message: 'El campo "mes" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => MesDto)
    mes: MesDto;

    @IsNotEmpty({ message: 'El campo "año" no puede estar vacío.' })
    @IsObject({ message: 'El campo "año" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => YearDto)
    year: YearDto;

    @IsNotEmpty({ message: 'El campo "moneda" no puede estar vacío.' })
    @IsObject({ message: 'El campo "moneda" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => MonedaDto)
    moneda: MonedaDto;

    @IsNotEmpty({ message: 'El campo "proveedor" no puede estar vacío.' })
    @IsObject({ message: 'El campo "proveedor" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => ProveedorDto)
    proveedor: ProveedorDto;

    @IsNotEmpty({ message: 'El campo "tipo comprobante" no puede estar vacío.' })
    @IsObject({ message: 'El campo "tipo comprobante" debe ser un objeto válido.' })
    @ValidateNested()
    @Type(() => TipoComprobanteDto)
    tipoComprobante: TipoComprobanteDto;

    @IsNotEmpty({ message: 'El campo "glosa" no puede estar vacío.' })
    @IsString({ message: "La glosa debe ser texto." })
    @MaxLength(150, { message: "La glosa no puede exceder los 150 caracteres." })
    glosa: string;

    @IsNotEmpty({ message: 'El campo "asiento" no puede estar vacío.' })
    @IsInt({ message: "El número de asiento debe ser un número entero." })
    nAsiento: number;

    @IsNotEmpty({ message: 'El campo "número de documento" no puede estar vacío.' })
    @IsString({ message: "El número de documento debe ser texto." })
    @MaxLength(45, { message: "El número de documento no puede exceder los 45 caracteres." })
    numeroDocumento: string;

    @IsNotEmpty({ message: 'El campo "fechaEmisionDocumento" no puede estar vacío.' })
    @IsDateString({}, { message: 'El campo "fechaEmisionDocumento" debe ser una fecha válida en formato YYYY-MM-DD.' })
    fechaEmisionDocumento: Date;

    @IsNotEmpty({ message: 'El campo "total" no puede estar vacío.' })
    @IsDecimal({ decimal_digits: '2' }, { message: "El valor de total debe ser un número decimal." })
    total: number;
}