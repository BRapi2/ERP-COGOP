import { MonedaDto } from "../../application/dto/moneda.dto";

export class TipoCambio {
    private constructor(
        public readonly id: number | undefined,
        public readonly fecha: Date,
        public readonly monedaOrigen: MonedaDto,
        public readonly monedaDestino: MonedaDto,
        public readonly tipoCambioCompra: string,
        public readonly tipoCambioVenta: string
    ) { }
    public static crear({ id, fecha, monedaOrigen, monedaDestino, tipoCambioCompra, tipoCambioVenta }: { id?: number; fecha: Date; monedaOrigen: MonedaDto; monedaDestino: MonedaDto, tipoCambioCompra: string, tipoCambioVenta: string }): TipoCambio {
        return new TipoCambio(id, fecha, monedaOrigen, monedaDestino, tipoCambioCompra, tipoCambioVenta);
    }
}