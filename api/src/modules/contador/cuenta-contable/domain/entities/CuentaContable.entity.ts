import { TipoSaldo } from "../../infrastructure/model/CuentaContable.model";

export class CuentaContable {
    private constructor(
        public readonly id: number | undefined,
        public readonly codigoCuenta: string | undefined,
        public readonly nombreCuenta: string,
        public readonly nivel: number | undefined,
        public readonly tipoSaldo: TipoSaldo,
        public readonly permiteMovimiento: boolean
    ) {}

    public static crear(props: {
        id?: number;
        codigoCuenta?: string;
        nombreCuenta: string;
        nivel?: number;
        tipoSaldo: TipoSaldo;
        permiteMovimiento: boolean;
    }): CuentaContable {
        return new CuentaContable(
            props.id,
            props.codigoCuenta,
            props.nombreCuenta,
            props.nivel,
            props.tipoSaldo,
            props.permiteMovimiento
        );
    }
}