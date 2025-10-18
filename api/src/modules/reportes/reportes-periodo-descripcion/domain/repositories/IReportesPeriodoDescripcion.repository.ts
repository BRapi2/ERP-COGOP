import { FindManyOptions } from "typeorm";
import { ReportesPeriodoDescripcionEntity } from "../entities/reportes-periodo-descripcion.entity";

export interface IReportesPeriodoDescripcionRepository {
    findById(id: number): Promise<ReportesPeriodoDescripcionEntity | null>;
    findByNombre(nombre: string): Promise<ReportesPeriodoDescripcionEntity | null>;
    save(entity: ReportesPeriodoDescripcionEntity): Promise<ReportesPeriodoDescripcionEntity>;
    findAndCount(options: FindManyOptions<ReportesPeriodoDescripcionEntity>): Promise<[ReportesPeriodoDescripcionEntity[], number]>;
    findAll(): Promise<ReportesPeriodoDescripcionEntity[]>;
}
