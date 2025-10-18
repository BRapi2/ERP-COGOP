import { IsInt, IsNotEmpty, IsString, MaxLength, Min, IsOptional } from 'class-validator';

export class YearDto {
  @IsOptional()
  @IsInt({ message: "El ID debe ser un número entero." })
  @Min(0, { message: "El ID no puede ser un número negativo." })
  id?: number;

  @IsNotEmpty({ message: 'El nombre del año es requerido' })
  @IsString()
  @MaxLength(25, { message: 'El nombre no puede exceder 25 caracteres' })
  name: string;
}