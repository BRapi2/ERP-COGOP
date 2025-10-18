type EstadoProps = {
    id?: number;
    nombre: string;
};

export class EstadoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string
    ) { }

    public static crear({ id, nombre }: EstadoProps): EstadoEntity {
        return new EstadoEntity(id, nombre);
    }
}