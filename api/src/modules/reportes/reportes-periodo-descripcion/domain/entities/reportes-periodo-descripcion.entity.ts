import { ReportesPeriodoDto } from "../../application/dto/reportes-periodo.dto";

export class ReportesPeriodoDescripcionEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly periodo: ReportesPeriodoDto
    ) { }

    public static crear({ id, nombre, periodo }: { id?: number; nombre: string; periodo: ReportesPeriodoDto }): ReportesPeriodoDescripcionEntity {
        return new ReportesPeriodoDescripcionEntity(id, nombre, periodo);
    }
}
