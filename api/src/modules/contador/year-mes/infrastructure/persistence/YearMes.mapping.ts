import { YearMesEntity } from "../../domain/entities/YearMes.entity";
import { YearMesModel } from "../model/YearMes.models";


export class YearMesMapping {
    public static toEntity(model: YearMesModel): YearMesEntity {
        if (!model) {
            throw new Error('Modelo no puede ser nulo');
        }
        return YearMesEntity.crear({
            id: model.id,
            mes: model.mes,
            year: model.year
        });
    }
    public static toModel(entity: YearMesEntity): YearMesModel {
        if (!entity) {
            throw new Error('Modelo no puede ser nulo');
        }
        const model = new YearMesModel();
        model.id = entity.id;
        if (!entity.year.id) {
            throw new Error('Year ID es requerido');
        }
        model.year = entity.year as any;
        if (!entity.mes.id) {
            throw new Error('Mes ID es requerido');
        }
        model.mes = entity.mes as any;
        return model;
    }
}