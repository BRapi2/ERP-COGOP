import { app } from "@azure/functions";

/// REPORTES PERIODO
import { getListarReportesPeriodo, saveReportePeriodo } from "../modules/reportes/reportes-periodo/presentation/routes/ReportesPeriodo.route";
app.http('reportes_periodo_listar', { route: "v1/reportes-periodo/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarReportesPeriodo });
app.http('reportes_periodo_guardar', { route: "v1/reportes-periodo/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveReportePeriodo });

/// REPORTES ESTADO
import { getListarReportesEstado, saveReporteEstado } from "../modules/reportes/reportes-estado/presentation/routes/ReportesEstado.route";
app.http('reportes_estado_listar', { route: "v1/reportes-estado/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarReportesEstado });
app.http('reportes_estado_guardar', { route: "v1/reportes-estado/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveReporteEstado });

/// REPORTES TIPO
import { getListarReportesTipo, saveReportesTipo } from "../modules/reportes/reportes-tipo/presentation/routes/ReportesTipo.route";
app.http('reportes_tipo_listar', { route: "v1/reportes-tipo/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarReportesTipo });
app.http('reportes_tipo_guardar', { route: "v1/reportes-tipo/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveReportesTipo });

/// REPORTES PERIODO DESCRIPCION
import { getListarReportesPeriodoDescripcion, saveReportesPeriodoDescripcion } from "../modules/reportes/reportes-periodo-descripcion/presentation/routes/ReportesPeriodoDescripcion.route";
app.http('reportes_periodo_descripcion_listar', { route: "v1/reportes-periodo-descripcion/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarReportesPeriodoDescripcion });
app.http('reportes_periodo_descripcion_guardar', { route: "v1/reportes-periodo-descripcion/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveReportesPeriodoDescripcion });

/// REPORTES
import { getListarReportes, addReportes, getReporteById, getReportesPorIglesia } from "../modules/reportes/reportes/presentation/routes/Reportes.route";
app.http('reportes_listar', { route: "v1/reportes/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarReportes });
app.http('reportes_guardar', { route: "v1/reportes/guardar", methods: ['POST'], authLevel: 'anonymous', handler: addReportes });
app.http('reportes_obtener_por_id', { route: 'v1/reportes/{id}', methods: ['GET'], authLevel: 'anonymous', handler: getReporteById });
app.http('reportes_por_iglesia', { route: "v1/reportes/iglesia/{id}", methods: ['GET'], authLevel: 'anonymous', handler: getReportesPorIglesia });


/// REPORTES TIPO ENCARGADO
import { getListarReportesTipoEncargado, saveReportesTipoEncargado } from "../modules/reportes/reportes_tipo_encargado/presentation/routes/ReportesTipoEncargado.route";

app.http('reportes_tipo_encargado_listar', {
    route: "v1/reportes-tipo-encargado/lista",
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getListarReportesTipoEncargado
});

app.http('reportes_tipo_encargado_guardar', {
    route: "v1/reportes-tipo-encargado/guardar",
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: saveReportesTipoEncargado
});

/// REPORTES FINANZAS MENSUALES
import { getListarReportesFinanzasMensuales, saveReporteFinanzasMensuales, getReporteFinanzasMensualesById } from "../modules/reportes/reportes-finanzas-mensuales/presentation/routes/ReportesFinanzasMensuales.route";
app.http('reportes_finanzas_mensuales_listar', { route: "v1/reportes-finanzas-mensuales/lista", methods: ['GET'], authLevel: 'anonymous', handler: getListarReportesFinanzasMensuales });
app.http('reportes_finanzas_mensuales_guardar', { route: "v1/reportes-finanzas-mensuales/guardar", methods: ['POST'], authLevel: 'anonymous', handler: saveReporteFinanzasMensuales });
app.http('reportes_finanzas_mensuales_obtener_por_id', { route: "v1/reportes-finanzas-mensuales/{id}", methods: ['GET'], authLevel: 'anonymous', handler: getReporteFinanzasMensualesById });
