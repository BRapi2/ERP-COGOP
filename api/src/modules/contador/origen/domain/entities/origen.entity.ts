export class Origen {
    private constructor(
        public readonly id: number | undefined,
        public readonly codigo: string,
        public readonly nombre: string
    ) { }

    public static crear({ id, codigo, nombre }: { id?: number; codigo: string; nombre: string; }): Origen {
        return new Origen(id, codigo, nombre);
    }
}