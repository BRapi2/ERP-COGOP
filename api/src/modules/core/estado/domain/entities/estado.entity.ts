export class EstadoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string
    ) { }

    public static crear(props: { id?: number; nombre: string; }): EstadoEntity {
        return new EstadoEntity(props.id, props.nombre);
    }
}
