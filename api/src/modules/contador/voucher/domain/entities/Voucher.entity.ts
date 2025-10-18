import { MesDto } from "../../application/dto/mes.dto";
import { YearDto } from "../../application/dto/year.dto";
import { OrigenDto } from "../../application/dto/origen.dto";
import { MonedaDto } from "../../application/dto/moneda.dto";
import { ProveedorDto } from "../../application/dto/proveedor.dto";
import { TipoComprobanteDto } from "../../application/dto/tipo_comprobante.dto";
import { VoucherDetailEntity } from "./VoucherDetail.entity";

export class VoucherEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly origen: OrigenDto,
        public readonly detalles: VoucherDetailEntity[],
        public readonly mes: MesDto,
        public readonly year: YearDto,
        public readonly glosa: string,
        public readonly nAsiento: number,
        public readonly moneda: MonedaDto,
        public readonly proveedor: ProveedorDto,
        public readonly tipoComprobante: TipoComprobanteDto,
        public readonly numeroDocumento: string,
        public readonly fechaEmisionDocumento: Date,
        public readonly total: number
    ) { }

    public static crear({ 
        id, 
        origen, 
        detalles,
        mes, 
        year, 
        glosa, 
        nAsiento, 
        moneda, 
        proveedor, 
        tipoComprobante, 
        numeroDocumento, 
        fechaEmisionDocumento, 
        total 
    }: { 
        id?: number; 
        origen: OrigenDto; 
        detalles: VoucherDetailEntity[];
        mes: MesDto; 
        year: YearDto; 
        glosa: string; 
        nAsiento: number; 
        moneda: MonedaDto; 
        proveedor: ProveedorDto; 
        tipoComprobante: TipoComprobanteDto; 
        numeroDocumento: string; 
        fechaEmisionDocumento: Date; 
        total: number 
    }): VoucherEntity {
        return new VoucherEntity(
            id, 
            origen, 
            detalles, 
            mes, 
            year, 
            glosa, 
            nAsiento, 
            moneda, 
            proveedor, 
            tipoComprobante, 
            numeroDocumento, 
            fechaEmisionDocumento,
            total
        );
    }
}