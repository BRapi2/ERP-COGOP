import { YearDto } from "../../application/dto/year.dto";

export class CuentaAjusteDiferenciaCambio {
    private constructor(
        public readonly id: number | undefined,
        public readonly valor: string,
        public readonly nombre: string,
        public readonly year: YearDto
    ) { }
    public static crear({ id, valor, nombre, year }: { id?: number; valor: string; nombre: string; year: YearDto }): CuentaAjusteDiferenciaCambio {
        return new CuentaAjusteDiferenciaCambio(id, valor, nombre, year);
    }
}