import { MesDto } from "../../application/dto/mes.dto";
import { YearDto } from "../../application/dto/year.dto";

export class YearMesEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly mes: MesDto,
        public readonly year: YearDto
    ) { }
    public static crear({ id, mes, year }: { id?: number; mes: MesDto; year: YearDto }): YearMesEntity {
        return new YearMesEntity(id, mes, year);
    }
}