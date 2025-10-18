class YearResponseDto {
    id: number;
    name: string;
}
export class CuentaAjusteResponseDto {
    id: number;
    nombre: string;
    valor: string;
    year: YearResponseDto;
}