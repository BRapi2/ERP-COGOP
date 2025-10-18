import { YearMesDto } from "../../application/dto/YearMes.dto";

export class TipoCambioCierreEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly yearMes: YearMesDto,
        public readonly compra: string,
        public readonly venta: string
    ) {}

    public static crear(props: {
        id?: number;
        yearMes: YearMesDto;
        compra: string;
        venta: string;
    }): TipoCambioCierreEntity {
        return new TipoCambioCierreEntity(
            props.id,
            props.yearMes,
            props.compra,
            props.venta
        );
    }
}