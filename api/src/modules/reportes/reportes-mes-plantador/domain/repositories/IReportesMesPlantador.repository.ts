import { FindManyOptions } from "typeorm";
import { ReportesMesPlantadorEntity } from "../entities/reportes-mes-plantador.entity";
import { ReportesMesPlantadorModel } from "../../infraestructure/model/reportes-mes-plantador.models";

export interface IReportesMesPlantadorRepository {
    findById(id: number): Promise<ReportesMesPlantadorEntity | null>;

    save(reporte: ReportesMesPlantadorEntity): Promise<ReportesMesPlantadorEntity>;

    findAndCount(options: FindManyOptions<ReportesMesPlantadorModel>): Promise<[ReportesMesPlantadorEntity[], number]>;

    findAll(): Promise<ReportesMesPlantadorEntity[]>;
}
