export class Year {
  private constructor(
    public readonly id: number | undefined,
    public readonly name: string
  ) { }

  public static crear({ id, name }: { id?: number; name: string; }): Year {
    return new Year(id, name);
  }
}