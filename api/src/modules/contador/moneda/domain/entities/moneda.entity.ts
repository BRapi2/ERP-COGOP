export class Moneda {
    private constructor(
        public readonly id: number | undefined,
        public readonly codigoMoneda: string,
        public readonly nombreMoneda: string
    ) { }

    public static crear({ id, codigoMoneda, nombreMoneda }: { id?: number; codigoMoneda: string; nombreMoneda: string; }): Moneda {
        if (!codigoMoneda || codigoMoneda.length !== 3) {
            throw new Error("Código de moneda inválido");
        }
        return new Moneda(id, codigoMoneda, nombreMoneda);
    }

    public esIgual(otraMoneda: Moneda): boolean {
        return this.codigoMoneda === otraMoneda.codigoMoneda;
    }
}