export class ReportesEstadoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string
    ) { }

    public static crear(props: { id?: number; nombre: string; }): ReportesEstadoEntity {
        return new ReportesEstadoEntity(props.id, props.nombre);
    }
}
