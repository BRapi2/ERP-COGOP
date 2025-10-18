export class DepartamentoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string
    ) { }

    public static crear(props: { id?: number; nombre: string; }): DepartamentoEntity {
        return new DepartamentoEntity(props.id, props.nombre);
    }
}