export class Rol {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly descripcion: string
    ) { }

    public static crear({ id, nombre, descripcion }: { id?: number; nombre: string; descripcion: string }): Rol {
        return new Rol(id, nombre, descripcion);
    }
}
