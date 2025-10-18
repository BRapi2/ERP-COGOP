import { ReportesTipoDto } from "../../application/dto/reportes-tipo.dto";
import { ReportesPeriodoDescripcionDto } from "../../application/dto/reportes-periodo-descripcion.dto";
import { ReportesEstadoDto } from "../../application/dto/reportes-estado.dto";
import { IglesiaDto } from "../../application/dto/iglesia.dto";
import { ReportesDto } from "../../application/dto/Reportes.dto";
export class ReportesEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly reportesTipo: ReportesTipoDto,
        public readonly reportesPeriodoDescripcion: ReportesPeriodoDescripcionDto,
        public readonly year: number,
        public readonly nombres: string,
        public readonly apellidos: string,
        public readonly telefono: string,
        public readonly email: string,
        public readonly direccion: string,
        public readonly reportesEstado: ReportesEstadoDto | undefined,
        public readonly iglesia: IglesiaDto,
        public readonly data?: number | null,
        public readonly extra?: any,   // <-- solo en la entidad
    ) { }

    // Factory principal a partir de DTO
    public static crear(dto: ReportesDto): ReportesEntity {
        return new ReportesEntity(
            dto.id,
            dto.reportesTipo,
            dto.reportesPeriodoDescripcion,
            dto.year,
            dto.nombres,
            dto.apellidos,
            dto.telefono ?? "",
            dto.email,
            dto.direccion,
            dto.reportesEstado,
            dto.iglesia,
            dto.data ?? null,  // ✅ Tomamos directamente del DTO
            undefined          // extra se llena en el service
        );
    }

    // Factory alternativo para agregar extra después
    public static conExtra(entity: ReportesEntity, extra: any): ReportesEntity {
        return new ReportesEntity(
            entity.id,
            entity.reportesTipo,
            entity.reportesPeriodoDescripcion,
            entity.year,
            entity.nombres,
            entity.apellidos,
            entity.telefono,
            entity.email,
            entity.direccion,
            entity.reportesEstado,
            entity.iglesia,
            entity.data,
            extra
        );
    }
}
