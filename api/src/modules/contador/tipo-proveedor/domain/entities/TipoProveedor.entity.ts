export class TipoProveedor {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombre: string
  ) { }

  public static crear({ id, nombre }: { id?: number; nombre: string }): TipoProveedor {
    return new TipoProveedor(id, nombre);
  }
}