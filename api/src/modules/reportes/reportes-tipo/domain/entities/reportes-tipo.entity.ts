import { ReportesTipoEncargadoDto } from "../../../reportes_tipo_encargado/application/dto/ReportesTipoEncargado.dto";
import { ReportesPeriodoDto } from "../../application/dto/reportes-periodo.dto";

export class ReportesTipoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly nombre: string,
        public readonly periodo: ReportesPeriodoDto,
        public readonly reportesTipoEncargado: ReportesTipoEncargadoDto[] = []
    ) { }

    public static crear({
        id,
        nombre,
        periodo,
        reportesTipoEncargado = []
    }: {
        id?: number;
        nombre: string;
        periodo: ReportesPeriodoDto;
        reportesTipoEncargado?: ReportesTipoEncargadoDto[];
    }): ReportesTipoEntity {
        return new ReportesTipoEntity(id, nombre, periodo, reportesTipoEncargado);
    }
}
