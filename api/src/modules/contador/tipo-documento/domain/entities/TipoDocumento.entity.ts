export class TipoDocumento {
  private constructor(
    public readonly id: number | undefined,
    public readonly nombre: string
  ) { }

  public static crear(props: {id?: number; nombre: string}): TipoDocumento {
    return new TipoDocumento(props.id, props.nombre);
  }
}