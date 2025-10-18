import { FindManyOptions } from "typeorm";
import { ReportesTipoEntity } from "../entities/reportes-tipo.entity";

export interface IReportesTipoRepository {
    findById(id: number): Promise<ReportesTipoEntity | null>;
    findByNombre(nombre: string): Promise<ReportesTipoEntity | null>;
    save(reportesTipo: ReportesTipoEntity): Promise<ReportesTipoEntity>;
    findAndCount(options: FindManyOptions<ReportesTipoEntity>): Promise<[ReportesTipoEntity[], number]>;
    findAll(): Promise<ReportesTipoEntity[]>;
}
