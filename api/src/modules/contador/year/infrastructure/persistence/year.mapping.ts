import { Year } from "../../domain/entities/year.entity";
import { YearModel } from "../model/year.model";

export class YearMapping {
    public static toEntity(model: YearModel): Year {
        return Year.crear({
            id: model.id,
            name: model.name,
        });
    }

    public static toModel(entity: Year): YearModel {
        const model = new YearModel();
        model.id = entity.id;
        model.name = entity.name;
        return model;
    }
}
