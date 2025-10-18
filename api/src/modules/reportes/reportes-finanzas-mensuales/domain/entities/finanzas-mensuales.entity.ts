export class FinanzasMensualesEntity {
    id!: number;
    fecha!: Date | null;
    ingresos!: number | null;
    egresos!: number | null;
    saldo_final!: number | null;
    responsable!: string | null;
    tipo_ingreso!: string | null;
    tipo_egreso!: string | null;
    metodo_pago!: string | null;
    donaciones!: number | null;
    gastos_actividad!: number | null;
    observaciones!: string | null;
    comentarios!: string | null;

    static crear(data: Partial<FinanzasMensualesEntity>): FinanzasMensualesEntity {
        const e = new FinanzasMensualesEntity();
        Object.assign(e, data);
        return e;
    }
}
