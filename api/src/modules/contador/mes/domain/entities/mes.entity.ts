export class Mes {
  private constructor(
    public readonly id: number | undefined,
    public readonly name: string
  ) { }

  public static crear({ id, name }: { id?: number; name: string }): Mes {
    return new Mes(id, name);
  }
}