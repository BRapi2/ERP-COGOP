export class CentroCosto{
    private constructor(
        public readonly id: number | undefined,
        public readonly codigo: string,
        public readonly nombre: string,
        public readonly activo: number
    ) { }
        public static crear({ id, codigo, nombre, activo }: { id?: number; codigo: string; nombre: string; activo: number }): CentroCosto {
        return new CentroCosto(id, codigo, nombre, activo);
    }
}