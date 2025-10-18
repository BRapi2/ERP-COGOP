
import { CentroCostoModel } from '../../modules/contador/centro-costo/infrastructure/model/CentroCosto.models'
import { TipoComprobanteModel } from '../../modules/contador/comprobantes/infrastructure/model/TipoComprobante.models'
import { CuentaAjusteDiferenciaCambioModel } from '../../modules/contador/cuenta-ajustes-diferencia-cambio/infrastructure/model/cuenta-ajuste-diferencia-cambio.models';
import { MonedaModel } from '../../modules/contador/moneda/infrastructure/model/moneda.models';
import { OrigenModel } from '../../modules/contador/origen/infrastructure/model/origen.model';
import { TipoCambioModels } from '../../modules/contador/tipo-cambio/infrastructure/model/tipo-cambio.models'
import { MesModel } from '../../modules/contador/mes/infrastructure/model/mes.model'
import { YearModel } from '../../modules/contador/year/infrastructure/model/year.model'
import { YearMesModel } from '../../modules/contador/year-mes/infrastructure/model/YearMes.models'
import { TipoCambioCierreModel } from '../../modules/contador/tipo-cambio-cierre/infrastructure/model/tipo-cambio-cierre.models'
import { CuentaContableModel } from '../../modules/contador/cuenta-contable/infrastructure/model/CuentaContable.model'
import { EstadoModel } from '../../modules/contador/estado/infrastructure/model/estado.models'
import { TipoDocumentoModel } from '../../modules/contador/tipo-documento/infrastructure/model/TipoDocumento.model';
import { TipoProveedorModel } from '../../modules/contador/tipo-proveedor/infrastructure/model/TipoProveedor.model';
import { ProveedorModel } from '../../modules/contador/proveedor/infrastructure/model/Proveedor.model';
import { VoucherModel } from '../../modules/contador/voucher/infrastructure/model/Voucher.models'
import { VoucherDetailModel } from '../../modules/contador/voucher/infrastructure/model/VoucherDetail.models'

export const entitiesContador = [
    VoucherModel,
    VoucherDetailModel,
    CentroCostoModel,
    CuentaAjusteDiferenciaCambioModel,
    MonedaModel,
    TipoComprobanteModel,
    TipoCambioModels,
    EstadoModel,
    CuentaContableModel,
    MesModel,
    OrigenModel,
    ProveedorModel,
    TipoCambioCierreModel,
    TipoProveedorModel,
    TipoDocumentoModel,
    YearMesModel,
    YearModel
];
