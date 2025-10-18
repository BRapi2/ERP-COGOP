import { FindManyOptions } from "typeorm";
import { ReportesTipoEncargadoEntity } from "../entities/reportes-tipo-encargado.entity";

export interface IReportesTipoEncargadoRepository {
    findById(id: number): Promise<ReportesTipoEncargadoEntity | null>;
    save(entity: ReportesTipoEncargadoEntity): Promise<ReportesTipoEncargadoEntity>;
    findAndCount(options: FindManyOptions<ReportesTipoEncargadoEntity>): Promise<[ReportesTipoEncargadoEntity[], number]>;
    findAll(): Promise<ReportesTipoEncargadoEntity[]>;
}
