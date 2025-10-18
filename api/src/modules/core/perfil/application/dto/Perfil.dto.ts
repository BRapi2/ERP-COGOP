import {    
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsInt
} from "class-validator";

export class PerfilDto {
  @IsOptional()
  @IsInt({ message: "El ID debe ser un número entero." })
  id?: number;

  @IsNotEmpty({ message: "El nombre es obligatorio." })
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @MaxLength(70, { message: "El nombre no puede exceder los 70 caracteres." })
  nombre: string;

  @IsNotEmpty({ message: "El apellido es obligatorio." })
  @IsString({ message: "El apellido debe ser una cadena de texto." })
  @MaxLength(70, { message: "El apellido no puede exceder los 70 caracteres." })
  apellido: string;
}