import { IsInt, Min } from 'class-validator';

export class RolOnlyIdDto {
    @IsInt({ message: 'El ID del rol debe ser un número entero.' })
    @Min(1, { message: 'El ID del rol debe ser mayor que 0.' })
    id: number;
}