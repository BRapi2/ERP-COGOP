import { IglesiaDto } from "../../application/dto/iglesia.dto";
import { ReportesTipoDto } from "../../application/dto/reportesTipo.dto";

export class ReportesTipoEncargadoEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly reportesTipo: ReportesTipoDto,
        public readonly iglesia: IglesiaDto,
    ) { }

    public static crear({
        id,
        reportesTipo,
        iglesia,
    }: {
        id?: number;
        reportesTipo: ReportesTipoDto;
        iglesia: IglesiaDto;
    }): ReportesTipoEncargadoEntity {
        return new ReportesTipoEncargadoEntity(id, reportesTipo, iglesia);
    }
}
