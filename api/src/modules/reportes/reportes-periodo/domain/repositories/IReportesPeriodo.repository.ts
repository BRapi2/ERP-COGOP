import { FindManyOptions } from "typeorm";
import { ReportesPeriodoEntity } from "../entities/reportes-periodo.entity";

export interface IReportesPeriodoRepository {
    findAll(): Promise<ReportesPeriodoEntity[]>;
    findById(id: number): Promise<ReportesPeriodoEntity | null>;
    findByNombre(nombre: string): Promise<ReportesPeriodoEntity | null>;
    save(reporte: ReportesPeriodoEntity): Promise<ReportesPeriodoEntity>;
    findAndCount(options: FindManyOptions<ReportesPeriodoEntity>): Promise<[ReportesPeriodoEntity[], number]>;
}
