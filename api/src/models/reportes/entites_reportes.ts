import { ReportesPeriodoModel } from "../../modules/reportes/reportes-periodo/infraestructure/model/reportes-periodo.models";
import { ReportesEstadoModel } from "../../modules/reportes/reportes-estado/infraestructure/model/reportes-estado.models";
import { ReportesTipoModel } from "../../modules/reportes/reportes-tipo/infraestructure/model/reportes-tipo.models";
import { ReportesPeriodoDescripcionModel } from "../../modules/reportes/reportes-periodo-descripcion/infraestructure/model/reportes-periodo-descripcion.models";
import { ReportesModel } from "../../modules/reportes/reportes/infraestructure/model/reportes.models";
import { ReportesTipoEncargadoModel } from "../../modules/reportes/reportes_tipo_encargado/infraestructure/model/reportes-tipo-encargado.models";
import { ReportesMesPlantadorModel } from "../../modules/reportes/reportes-mes-plantador/infraestructure/model/reportes-mes-plantador.models";

export const entitiesReportes = [
    ReportesModel,
    ReportesTipoModel,
    ReportesPeriodoDescripcionModel,
    ReportesPeriodoModel,
    ReportesEstadoModel,
    ReportesTipoEncargadoModel,
    ReportesMesPlantadorModel,
]