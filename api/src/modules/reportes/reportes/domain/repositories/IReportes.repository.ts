import { FindManyOptions } from "typeorm";
import { ReportesEntity } from "../entities/reportes.entity";
import { ReportesModel } from "../../infraestructure/model/reportes.models";

export interface IReportesRepository {
    findById(id: number): Promise<ReportesEntity | null>;
    findDuplicate(dynamicRelationKey: string, dynamicRelationId?: number, excludeId?: number): Promise<ReportesEntity | null>;
    save(reporte: ReportesEntity): Promise<ReportesEntity>;
    findAndCount(options: FindManyOptions<ReportesModel>): Promise<[ReportesEntity[], number]>;
    findAll(): Promise<ReportesEntity[]>;
    findByIglesiaId(iglesiaId: number): Promise<ReportesEntity[]>;
    findByIglesiaIdWithFilters(iglesiaId: number, options?: FindManyOptions<ReportesModel>): Promise<[ReportesEntity[], number]>;
}
