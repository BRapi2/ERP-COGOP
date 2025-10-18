import { IsOptional, IsInt, Min, IsString, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
export class ListQueryDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(0)
    page: number = 0;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    size: number = 10;

    @IsOptional()
    @IsString()
    sort: string = 'id,asc';

    @IsOptional()
    @IsString()
    search: string = '';

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    all: boolean = false;
}