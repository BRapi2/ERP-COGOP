import { FindManyOptions } from "typeorm";
import { ReportesEstadoEntity } from "../entities/reportes-estado.entity";

export interface IReportesEstadoRepository {
    findAll(): Promise<ReportesEstadoEntity[]>;
    findById(id: number): Promise<ReportesEstadoEntity | null>;
    findByNombre(nombre: string): Promise<ReportesEstadoEntity | null>;
    save(estado: ReportesEstadoEntity): Promise<ReportesEstadoEntity>;
    findAndCount(options: FindManyOptions<ReportesEstadoEntity>): Promise<[ReportesEstadoEntity[], number]>;
}
