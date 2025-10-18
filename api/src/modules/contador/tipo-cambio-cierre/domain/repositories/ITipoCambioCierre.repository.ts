import { FindManyOptions } from "typeorm";
import { TipoCambioCierreEntity } from "../entities/TipoCambioCierre.entity";

export interface ITipoCambioCierreRepository {
    findById(id: number): Promise<TipoCambioCierreEntity | null>;
    findByYearMesId(yearMesId: number): Promise<TipoCambioCierreEntity | null>;
    save(tipoCambioCierre: TipoCambioCierreEntity): Promise<TipoCambioCierreEntity>;
    findAndCount(options: FindManyOptions<TipoCambioCierreEntity>): Promise<[TipoCambioCierreEntity[], number]>;
}