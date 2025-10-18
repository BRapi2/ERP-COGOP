import { IsInt, IsNotEmpty } from 'class-validator';

export class MonedaDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}