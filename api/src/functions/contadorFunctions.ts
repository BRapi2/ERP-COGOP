import { app } from "@azure/functions";

//CUENTA CONTABLE
import { getListarCuentasContables, saveCuentaContable } from '../modules/contador/cuenta-contable/presentation/routes/CuentaContable.route';
app.http('contador_cuenta_contable_listar', { route: "v1/cuenta-contable/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarCuentasContables });
app.http('contador_cuenta_contable_agregar', { route: "v1/cuenta-contable/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveCuentaContable });

//PROVEEDOR
import { getListarProveedores, saveProveedor } from '../modules/contador/proveedor/presentation/routes/Proveedor.route';
app.http('contador_proveedor_listar', { route: "v1/proveedor/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarProveedores });
app.http('contador_proveedor_agregar', { route: "v1/proveedor/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveProveedor });

//TIPO PROVEEDOR
import { getListarTipoProveedor, saveTipoProveedor } from '../modules/contador/tipo-proveedor/presentation/routes/TipoProveedor.route';
app.http('contador_tipo_proveedor_listar', { route: "v1/tipo-proveedor/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarTipoProveedor });
app.http('contador_tipo_proveedor_agregar', { route: "v1/tipo-proveedor/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveTipoProveedor });

//TIPO DOCUMENTO
import { getListarTipoDocumento, saveTipoDocumento } from '../modules/contador/tipo-documento/presentation/routes/TipoDocumento.route';
app.http('contador_tipo_documento_listar', { route: "v1/tipo-documento/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarTipoDocumento });
app.http('contador_tipo_documento_agregar', { route: "v1/tipo-documento/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveTipoDocumento });

//ESTADO
import { getListarEstados, saveEstado } from '../modules/contador/estado/presentation/routes/estado.route';
app.http('contador_estado_con_listar', { route: "v1/estado-con/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarEstados });
app.http('contador_estado_con_agregar', { route: "v1/estado-con/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveEstado });

//YEAR MES
import { getListarYearMes, saveYearMes } from '../modules/contador/year-mes/presentation/routes/YearMes.routes';
app.http('contador_mes_year_listar', { route: "v1/year-mes/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarYearMes });
app.http('contador_mes_year_agregar', { route: "v1/year-mes/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveYearMes });

//MESES
import { getListarMes, saveMes } from '../modules/contador/mes/presentation/routes/mes.routes';
app.http('contador_mes_listar', { route: "v1/mes/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarMes });
app.http('contador_mes_agregar', { route: "v1/mes/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveMes });

//AÑO
import { getListarYear, saveYear } from '../modules/contador/year/presentation/routes/year.routes';
app.http('contador_year_listar', { route: "v1/year-entity/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarYear });
app.http('contador_year_agregar', { route: "v1/year-entity/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveYear });

//CENTROS DE COSTOS
import { getListarCentroCostos, addCentroCostos } from '../modules/contador/centro-costo/presentation/routes/CentroCostos.route'
app.http('contador_centro_costos_listar', { route: "v1/centro-costo/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarCentroCostos });
app.http('contador_centro_costos_agregar', { route: "v1/centro-costo/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addCentroCostos });

//COMPROBANTES
import { getListarComprobante, addComprobante } from '../modules/contador/comprobantes/presentation/routes/Comprobantes.route';
app.http('contador_tipo_comprobante_listar', { route: "v1/tipo-comprobante/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarComprobante });
app.http('contador_tipo_comprobante_agregar', { route: "v1/tipo-comprobante/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addComprobante });

//ORIGENES
import { getListarOrigenes, addOrigen } from '../modules/contador/origen/presentation/routes/Origenes.routes';
app.http('contador_origenes_listar', { route: "v1/origen/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarOrigenes });
app.http('contador_origenes_agregar', { route: "v1/origen/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addOrigen });

//MONEDAS
import { getListarMonedas, addMonedas } from '../modules/contador/moneda/presentation/routes/Moneda.route';
app.http('contador_monedas_listar', { route: "v1/moneda/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarMonedas });
app.http('contador_monedas_agregar', { route: "v1/moneda/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addMonedas });

//TIPO CAMBIO
import { getListarTipoCambio, addTipoCambio } from '../modules/contador/tipo-cambio/presentation/routes/TipoCambio.route';
app.http('contador_tipo_cambios_listar', { route: "v1/tipo-cambio/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarTipoCambio });
app.http('contador_tipo_cambios_agregar', { route: "v1/tipo-cambio/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addTipoCambio });

//TIPO CAMBIO CIERRE
import { getListarTipoCambioCierre, saveTipoCambioCierre } from '../modules/contador/tipo-cambio-cierre/presentation/routes/tipo-cambio-cierre.routes';
app.http('contador_tipo_cambios_cierre_listar', { route: "v1/tipo-cambio-cierre/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarTipoCambioCierre });
app.http('contador_tipo_cambios_cierre_agregar', { route: "v1/tipo-cambio-cierre/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveTipoCambioCierre });

//CUENTA DIFERENCIA CAMBIO
import { getListarCuentaDiferenciaCambio, addCuentaDiferenciaCambio } from '../modules/contador/cuenta-ajustes-diferencia-cambio/presentation/routes/CuentaDiferenciaCambio.route';
app.http('contador_cuenta_diferencia_cambio_listar', { route: "v1/cuenta-ajuste-diferencia-cambio/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarCuentaDiferenciaCambio });
app.http('contador_cuenta_diferencia_cambio_agregar', { route: "v1/cuenta-ajuste-diferencia-cambio/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addCuentaDiferenciaCambio });


//Voucher
import { getListarVoucher, addVocher, getListarVoucherAsiento, getListarSettings } from '../modules/contador/voucher/presentation/routes/Voucher.route';
app.http('contador_voucher_listar', { route: "v1/voucher/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarVoucher });
app.http('contador_voucher_agregar', { route: "v1/voucher/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addVocher });
app.http('contador_voucher_add_generar', { route: "v1/voucher/generar-asiento", methods: ['POST'], authLevel: 'anonymous', handler: getListarVoucherAsiento });
app.http('contador_voucher_listar_settings', { route: "v1/voucher/lista-settings", methods: ['GET'], authLevel: 'anonymous', handler: getListarSettings });