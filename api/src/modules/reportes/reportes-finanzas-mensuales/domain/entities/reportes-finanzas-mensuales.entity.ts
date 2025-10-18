import { ReportesFinanzasMensualesDto } from "../../application/dto/ReportesFinanzasMensuales.dto";

export class ReportesFinanzasMensualesEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly fecha: Date | null,
        public readonly ingresos: number | null,
        public readonly egresos: number | null,
        public readonly saldo_final: number | null,
        public readonly responsable: string | null,
        public readonly tipo_ingreso: string | null,
        public readonly tipo_egreso: string | null,
        public readonly metodo_pago: string | null,
        public readonly donaciones: number | null,
        public readonly gastos_actividad: number | null,
        public readonly observaciones: string | null,
        public readonly comentarios: string | null,
    ) { }

    public static crear(dto: ReportesFinanzasMensualesDto): ReportesFinanzasMensualesEntity {
        return new ReportesFinanzasMensualesEntity(
            dto.id,
            dto.fecha,
            dto.ingresos,
            dto.egresos,
            dto.saldo_final,
            dto.responsable,
            dto.tipo_ingreso,
            dto.tipo_egreso,
            dto.metodo_pago,
            dto.donaciones,
            dto.gastos_actividad,
            dto.observaciones,
            dto.comentarios,
        );
    }
}
