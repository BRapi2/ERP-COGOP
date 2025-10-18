export class ReportesPeriodoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string
    ) { }

    public static crear(props: { id?: number; nombre: string }): ReportesPeriodoEntity {
        return new ReportesPeriodoEntity(props.id, props.nombre);
    }
}
