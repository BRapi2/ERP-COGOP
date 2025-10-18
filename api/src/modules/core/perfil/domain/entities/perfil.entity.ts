export class PerfilEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly apellido: string
    ) {}

    public static crear(props: { id?: number; nombre: string; apellido: string }): PerfilEntity {
        return new PerfilEntity(
            props.id,
            props.nombre,
            props.apellido
        );
    }
}