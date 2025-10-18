import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';
import { RolDto } from "../../../rol/application/dto/Rol.dto";
import { RolOnlyIdDto } from './RolOnlyIdDto.dto';

export class MenuDto {
    @IsOptional()
    @IsInt({ message: "El ID debe ser un número entero." })
    @Min(0, { message: "El ID no puede ser un número negativo." })
    id?: number;

    @IsNotEmpty({ message: 'El orden no puede estar vacío.' })
    @IsInt({ message: 'El orden debe ser un número entero.' })
    order: number;

    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString()
    @MaxLength(45, { message: "El 'nombre' no puede exceder los 45 caracteres." })
    nombre: string;

    @IsNotEmpty({ message: 'La URL no puede estar vacía.' })
    @IsString()
    @MaxLength(45, { message: "La 'URL' no puede exceder los 45 caracteres." })
    url: string;

    @IsNotEmpty({ message: 'El parentId no puede estar vacío.' })
    @IsInt({ message: 'El parentId debe ser un número entero.' })
    parentId: number;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => MenuDto)
    parent?: MenuDto;

    @IsNotEmpty({ message: 'El rol es requerido.' })
    @IsObject()
    @ValidateNested()
    @Type(() => RolDto)
    rol: RolDto;

    @IsOptional()
    @IsString()
    @MaxLength(15, { message: "El 'classsChange' no puede exceder los 15 caracteres." })
    classsChange?: string;

    @IsOptional()
    @IsString()
    @MaxLength(40, { message: "El 'iconStyle' no puede exceder los 40 caracteres." })
    iconStyle?: string;
}
