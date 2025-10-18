import { IsInt, IsOptional, IsString } from 'class-validator';

export class YearDto {
    @IsInt()
    id: number;

    @IsOptional()
    @IsString()
    name?: string;
}