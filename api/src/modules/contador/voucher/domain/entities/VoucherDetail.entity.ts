// src/domain/entities/VoucherDetail.entity.ts

import { CuentasContablesDto } from "../../application/dto/cuentas_contables.dto";
import { CentroCostoDto } from "../../application/dto/centro_costo.dto";

export class VoucherDetailEntity {
    private constructor(
        public readonly id: number | undefined,
        public readonly cuentaContable: CuentasContablesDto,
        public readonly centroCosto: CentroCostoDto | undefined,
        public readonly debe: number,
        public readonly haber: number
    ) {}

    public static crear(props: {
        id?: number;
        cuentaContable: CuentasContablesDto;
        centroCosto?: CentroCostoDto;
        debe: number;
        haber: number;
    }): VoucherDetailEntity {
        return new VoucherDetailEntity(props.id, props.cuentaContable, props.centroCosto, props.debe, props.haber);
    }
}