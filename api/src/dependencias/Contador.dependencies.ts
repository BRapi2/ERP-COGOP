import { container } from "tsyringe";
import { DataSource } from "typeorm";

//USER
import { IUserRepository } from "../modules/core/user/domain/repositories/IUser.repository";
import { UserRepository } from "../modules/core/user/infraestructure/repositories/User.repository";
import { UserService } from "../modules/core/user/application/services/User.service";
import { UserController } from "../modules/core/user/presentation/controllers/User.controller";

//PEFIL
import { IPerfilRepository } from "../modules/core/perfil/domain/repositories/IPerfil.repository";
import { PerfilRepository } from "../modules/core/perfil/infraestructure/repositories/Perfil.repository";
import { PerfilService } from "../modules/core/perfil/application/services/Perfil.service";
import { PerfilController } from "../modules/core/perfil/presentation/controllers/Perfil.controller";

//YEAR MES
import { IYearMesRepository } from '../modules/contador/year-mes/domain/repositories/IYearMes.repository';
import { YearMesRepository } from '../modules/contador/year-mes/infrastructure/repositories/YearMes.Repository';
import { YearMesService } from "../modules/contador/year-mes/application/services/YearMes.service";
import { YearMesController } from "../modules/contador/year-mes/presentation/controllers/YearMes.controller";

// CENTRO DE COSTOS
import { ICentroCostoRepository } from '../modules/contador/centro-costo/domain/repositories/ICentroCosto.repository';
import { CentroCostoRepository } from '../modules/contador/centro-costo/infrastructure/repositories/CentroCosto.repository';
import { CentroCostoService } from "../modules/contador/centro-costo/application/services/CentroCosto.service";
import { CentroCostoController } from "../modules/contador/centro-costo/presentation/controllers/CentroCosto.controller";

// YEAR
import { IYearRepository } from '../modules/contador/year/domain/repositories/iyear.repository';
import { YearRepository } from '../modules/contador/year/infrastructure/repositories/year.repository';
import { YearService } from "../modules/contador/year/application/services/year.service";
import { YearController } from "../modules/contador/year/presentation/controllers/year.controller";

// MES
import { IMesRepository } from '../modules/contador/mes/domain/repositories/imes.repository';
import { MesRepository } from '../modules/contador/mes/infrastructure/repositories/mes.repository';
import { MesService } from "../modules/contador/mes/application/services/mes.service";
import { MesController } from "../modules/contador/mes/presentation/controllers/mes.controller";

// COMPROBANTES
import { ITipoComprobanteRepository } from "../modules/contador/comprobantes/domain/repositories/ITipoComprobante.repository";
import { TipoComprobanteRepository } from "../modules/contador/comprobantes/infrastructure/repositories/TipoComprobante.repository";
import { TipoComprobanteService } from "../modules/contador/comprobantes/application/services/TipoComprobante.service";
import { TipoComprobanteController } from "../modules/contador/comprobantes/presentation/controllers/TipoComprobante.controller";

// CUENTA AJUSTES
import { ICuentaAjusteRepository } from "../modules/contador/cuenta-ajustes-diferencia-cambio/domain/repositories/ICuentaAjuste.repository";
import { CuentaAjusteRepository } from "../modules/contador/cuenta-ajustes-diferencia-cambio/infrastructure/repositories/CuentaAjuste.repository";
import { CuentaAjusteService } from "../modules/contador/cuenta-ajustes-diferencia-cambio/application/services/CuentaAjuste.service";
import { CuentaAjusteController } from "../modules/contador/cuenta-ajustes-diferencia-cambio/presentation/controllers/CuentaAjuste.controller";

// MONEDA
import { IMonedaRepository } from "../modules/contador/moneda/domain/repositories/IMoneda.repository";
import { MonedaRepository } from "../modules/contador/moneda/infrastructure/repositories/Moneda.repository";
import { MonedaService } from "../modules/contador/moneda/application/services/Moneda.service";
import { MonedaController } from "../modules/contador/moneda/presentation/controllers/Moneda.controller";

// PROVEEDOR
import { IOrigenRepository } from "../modules/contador/origen/domain/repositories/iorigen.repository";
import { OrigenRepository } from "../modules/contador/origen/infrastructure/repositories/origen.repository";
import { OrigenService } from "../modules/contador/origen/application/services/origen.service";
import { OrigenController } from "../modules/contador/origen/presentation/controllers/origen.controller";

// TIPO PROVEEDOR
import { ITipoCambioRepository } from "../modules/contador/tipo-cambio/domain/repositories/ITipoCambio.repository";
import { TipoCambioRepository } from "../modules/contador/tipo-cambio/infrastructure/repositories/TipoCambio.repository";
import { TipoCambioService } from "../modules/contador/tipo-cambio/application/service/TipoCambio.service";
import { TipoCambioController } from "../modules/contador/tipo-cambio/presentation/controllers/TipoCambio.controller";

// TIPO CAMBIO CIERRE
import { TipoCambioCierreRepository } from "../modules/contador/tipo-cambio-cierre/infrastructure/repositories/TipoCambioCierre.repository";
import { ITipoCambioCierreRepository } from "../modules/contador/tipo-cambio-cierre/domain/repositories/ITipoCambioCierre.repository";
import { TipoCambioCierreService } from "../modules/contador/tipo-cambio-cierre/application/services/TipoCambioCierre.service";
import { TipoCambioCierreController } from "../modules/contador/tipo-cambio-cierre/presentation/controllers/TipoCambioCierre.controller";

// ESTADO
import { EstadoRepository } from "../modules/contador/estado/infrastructure/repositories/Estado.repository";
import { IEstadoRepository } from "../modules/contador/estado/domain/repositories/IEstado.repository";
import { EstadoService } from "../modules/contador/estado/application/services/Estado.service";
import { EstadoController } from "../modules/contador/estado/presentation/controllers/Estado.controller";

// TIPO DOCUMENTO
import { ITipoDocumentoRepository } from '../modules/contador/tipo-documento/domain/repositories/ITipoDocumento.repository';
import { TipoDocumentoRepository } from '../modules/contador/tipo-documento/infrastructure/repositories/TipoDocumento.repository';
import { TipoDocumentoService } from "../modules/contador/tipo-documento/application/services/TipoDocumento.service";
import { TipoDocumentoController } from "../modules/contador/tipo-documento/presentation/controllers/TipoDocumento.controller";

// TIPO PROVEEDOR
import { ITipoProveedorRepository } from '../modules/contador/tipo-proveedor/domain/repositories/ITipoProveedor.repository';
import { TipoProveedorRepository } from '../modules/contador/tipo-proveedor/infrastructure/repositories/TipoProveedor.repository';
import { TipoProveedorService } from "../modules/contador/tipo-proveedor/application/services/TipoProveedor.service";
import { TipoProveedorController } from "../modules/contador/tipo-proveedor/presentation/controllers/TipoProveedor.controller";

// PROVEEDOR
import { IProveedorRepository } from '../modules/contador/proveedor/domain/repositories/iproveedor.repository';
import { ProveedorRepository } from '../modules/contador/proveedor/infrastructure/repositories/Proveedor.repository';
import { ProveedorService } from "../modules/contador/proveedor/application/services/Proveedor.service";
import { ProveedorController } from "../modules/contador/proveedor/presentation/controllers/Proveedor.controller";

// CUENTA CONTABLE
import { ICuentaContableRepository } from '../modules/contador/cuenta-contable/domain/repositories/ICuentaContable.repository';
import { CuentaContableRepository } from '../modules/contador/cuenta-contable/infrastructure/repositories/CuentaContable.repository';
import { CuentaContableService } from "../modules/contador/cuenta-contable/application/services/CuentaContable.service";
import { CuentaContableController } from "../modules/contador/cuenta-contable/presentation/controllers/CuentaContable.controller";

// Voucher
import { IVoucherRepository } from '../modules/contador/voucher/domain/repositories/IVoucher.repository';
import { VoucherRepository } from '../modules/contador/voucher/infrastructure/repositories/Voucher.repository';
import { VoucherService } from "../modules/contador/voucher/application/services/Voucher.service";
import { VoucherController } from "../modules/contador/voucher/presentation/controllers/Voucher.controller";

import { AppDataSource2 } from "../db";

export const registerContadorDependencies = () => {
    container.registerInstance(DataSource, AppDataSource2);
    //USER
    container.register<IUserRepository>("IUserRepository", { useClass: UserRepository });
    container.register(UserService, { useClass: UserService });
    container.register(UserController, { useClass: UserController });
    // PERFIL
    container.register<IPerfilRepository>("IPerfilRepository", { useClass: PerfilRepository });
    container.register(PerfilService, { useClass: PerfilService });
    container.register(PerfilController, { useClass: PerfilController });
    //CUENTA CONTABLE
    container.register<ICuentaContableRepository>("ICuentaContableRepository", { useClass: CuentaContableRepository });
    container.register(CuentaContableService, { useClass: CuentaContableService });
    container.register(CuentaContableController, { useClass: CuentaContableController });
    //PROVEEDOR
    container.register<IProveedorRepository>("IProveedorRepository", { useClass: ProveedorRepository });
    container.register(ProveedorService, { useClass: ProveedorService });
    container.register(ProveedorController, { useClass: ProveedorController });
    //CONTAINER TIPO PROVEEDOR
    container.register<ITipoProveedorRepository>("ITipoProveedorRepository", { useClass: TipoProveedorRepository });
    container.register(TipoProveedorService, { useClass: TipoProveedorService });
    container.register(TipoProveedorController, { useClass: TipoProveedorController });
    //CONTAINER TIPO DOCUMENTO
    container.register<ITipoDocumentoRepository>("ITipoDocumentoRepository", { useClass: TipoDocumentoRepository });
    container.register(TipoDocumentoService, { useClass: TipoDocumentoService });
    container.register(TipoDocumentoController, { useClass: TipoDocumentoController });
    //CONTAINER ESTADO
    container.register<IEstadoRepository>("IEstadoRepository", { useClass: EstadoRepository });
    container.register(EstadoService, { useClass: EstadoService });
    container.register(EstadoController, { useClass: EstadoController });
    //CONTAINER DE YEAR MES
    container.register<IYearMesRepository>("IYearMesRepository", { useClass: YearMesRepository });
    container.register(YearMesService, { useClass: YearMesService });
    container.register(YearMesController, { useClass: YearMesController });
    //CONTAINER DE MES
    container.register<IMesRepository>("IMesRepository", { useClass: MesRepository });
    container.register(MesService, { useClass: MesService });
    container.register(MesController, { useClass: MesController });
    //CONTAINER DE YEAR
    container.register<IYearRepository>("IYearRepository", { useClass: YearRepository });
    container.register(YearService, { useClass: YearService });
    container.register(YearController, { useClass: YearController });
    //CONTAINER DE CENTRO DE COSTOS
    container.register<ICentroCostoRepository>("ICentroCostoRepository", { useClass: CentroCostoRepository });
    container.register(CentroCostoService, { useClass: CentroCostoService });
    container.register(CentroCostoController, { useClass: CentroCostoController });
    //CONTAINER DE COMPROBANTES
    container.register<ITipoComprobanteRepository>("ITipoComprobanteRepository", { useClass: TipoComprobanteRepository });
    container.register(TipoComprobanteService, { useClass: TipoComprobanteService });
    container.register(TipoComprobanteController, { useClass: TipoComprobanteController });
    //CUENTA AJUSTES
    container.register<ICuentaAjusteRepository>("ICuentaAjusteRepository", { useClass: CuentaAjusteRepository });
    container.register(CuentaAjusteService, { useClass: CuentaAjusteService });
    container.register(CuentaAjusteController, { useClass: CuentaAjusteController });
    //MONEDA MONEDA
    container.register<IMonedaRepository>("IMonedaRepository", { useClass: MonedaRepository });
    container.register(MonedaService, { useClass: MonedaService });
    container.register(MonedaController, { useClass: MonedaController });
    //ORIGEN ORIGEN
    container.register<IOrigenRepository>("IOrigenRepository", { useClass: OrigenRepository });
    container.register(OrigenService, { useClass: OrigenService });
    container.register(OrigenController, { useClass: OrigenController });

    container.register<ITipoCambioCierreRepository>("ITipoCambioCierreRepository", { useClass: TipoCambioCierreRepository });
    //TIPO DE CAMBIO
    container.register<ITipoCambioRepository>("ITipoCambioRepository", { useClass: TipoCambioRepository });
    container.register(TipoCambioService, { useClass: TipoCambioService });
    container.register(TipoCambioController, { useClass: TipoCambioController });

    //TIPO DE CAMBIO CIERRE
    container.register<ITipoCambioCierreRepository>("ITipoCambioCierreRepository", { useClass: TipoCambioCierreRepository });
    container.register(TipoCambioCierreService, { useClass: TipoCambioCierreService });
    container.register(TipoCambioCierreController, { useClass: TipoCambioCierreController });

    //VOUCHER
    container.register<IVoucherRepository>("IVoucherRepository", { useClass: VoucherRepository });
    container.register(VoucherService, { useClass: VoucherService });
    container.register(VoucherController, { useClass: VoucherController });
};
