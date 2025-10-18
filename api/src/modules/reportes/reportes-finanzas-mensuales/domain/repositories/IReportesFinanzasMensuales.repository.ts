import { FindManyOptions } from "typeorm";
import { FinanzasMensualesEntity } from "../entities/finanzas-mensuales.entity";
import { FinanzasMensualesModel } from "../../infraestructure/model/finanzas-mensuales.models";

export interface IReportesFinanzasMensualesRepository {
    findById(id: number): Promise<FinanzasMensualesEntity | null>;

    save(reporte: FinanzasMensualesEntity): Promise<FinanzasMensualesEntity>;

    findAndCount(options?: FindManyOptions<FinanzasMensualesModel>): Promise<[FinanzasMensualesEntity[], number]>;

    findAll(): Promise<FinanzasMensualesEntity[]>;
}
