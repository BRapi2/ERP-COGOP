export class TipoComprobante {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string
    ) { }
    public static crear({ id, nombre }: { id?: number; nombre: string; }): TipoComprobante {
        return new TipoComprobante(id, nombre);
    }
}