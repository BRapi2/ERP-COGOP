// src/modules/contador/proveedor/application/dto/proveedor.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsInt, IsObject, ValidateNested } from "class-validator";
import { TipoProveedorDto } from "./TipoProveedor.dto";
import { TipoDocumentoDto } from "./TipoDocumento.dto";
import { Type } from "class-transformer";

export class ProveedorDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    id?: number;

    @IsNotEmpty({ message: "El RUC es obligatorio." })
    @IsString({ message: "El RUC debe ser una cadena de texto." })
    @MaxLength(11, { message: "El RUC no puede exceder los 11 caracteres." })
    ruc: string;

    @IsNotEmpty({ message: "El nombre es obligatorio." })
    @IsString({ message: "El nombre debe ser una cadena de texto." })
    @MaxLength(250, { message: "El nombre no puede exceder los 250 caracteres." })
    nombre: string;

    @IsOptional()
    @IsString({ message: "La dirección debe ser una cadena de texto." })
    @MaxLength(250, { message: "La dirección no puede exceder los 250 caracteres." })
    direccion?: string;

    @IsNotEmpty({ message: "El tipo de proveedor es obligatorio." })
    @IsObject()
    @ValidateNested()
    @Type(() => TipoProveedorDto)
    tipoProveedor: TipoProveedorDto;

    @IsNotEmpty({ message: "El tipo de documento es obligatorio." })
    @IsObject()
    @ValidateNested()
    @Type(() => TipoDocumentoDto)
    tipoDocumento: TipoDocumentoDto;
}