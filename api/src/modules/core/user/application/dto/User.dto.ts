import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { RolDto } from "./Rol.dto";
import { EstadoDto } from "./Estado.dto";
import { IglesiaDto } from "./Iglesia.dto";
import { PerfilDto } from "./Perfil.dto";

export class UserDto {
  @IsOptional()
  @IsInt({ message: "El ID debe ser un número entero." })
  id?: number;

  @IsNotEmpty({ message: "El nombre de usuario es obligatorio." })
  @IsString({ message: "El nombre de usuario debe ser una cadena de texto." })
  @MaxLength(100, { message: "El nombre de usuario no puede exceder los 100 caracteres." })
  username: string;

  @IsNotEmpty({ message: "La contraseña es obligatoria." })
  @IsString({ message: "La contraseña debe ser una cadena de texto." })
  @MaxLength(150, { message: "La contraseña no puede exceder los 150 caracteres." })
  password: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PerfilDto)
  perfil: PerfilDto;

  @IsNotEmpty({ message: "El rol es obligatorio." })
  @IsObject({ message: "El rol debe ser un objeto válido." })
  @ValidateNested()
  @Type(() => RolDto)
  rol: RolDto;

  @IsNotEmpty({ message: "El estado es obligatorio." })
  @IsObject({ message: "El estado debe ser un objeto válido." })
  @ValidateNested()
  @Type(() => EstadoDto)
  estado: EstadoDto;

  @IsOptional()
  @IsString({ message: "La imagen debe ser una cadena de texto." })
  @MaxLength(100, { message: "La ruta de la imagen no puede exceder los 100 caracteres." })
  imagen?: string | null;

  @IsOptional()
  @IsObject({ message: "La iglesia debe ser un objeto válido." })
  @ValidateNested()
  @Type(() => IglesiaDto)
  iglesia?: IglesiaDto;

  @IsOptional()
  @IsString({ message: "El ministerio debe ser una cadena de texto." })
  @MaxLength(45, { message: "El ministerio no puede exceder los 45 caracteres." })
  ministerio?: string | null;

  @IsOptional()
  @IsString({ message: "La misión debe ser una cadena de texto." })
  @MaxLength(120, { message: "La misión no puede exceder los 120 caracteres." })
  mision?: string | null;
}