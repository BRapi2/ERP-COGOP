import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { AppDataSource } from "../db";

import { ReportesPeriodoController } from "../modules/reportes/reportes-periodo/presentation/controllers/ReportesPeriodo.controller";
import { ReportesPeriodoService } from "../modules/reportes/reportes-periodo/application/services/ReportesPeriodo.service";
import { IReportesPeriodoRepository } from "../modules/reportes/reportes-periodo/domain/repositories/IReportesPeriodo.repository";
import { ReportesPeriodoRepository } from "../modules/reportes/reportes-periodo/infraestructure/repositories/ReportesPeriodo.repository";

import { ReportesEstadoController } from "../modules/reportes/reportes-estado/presentation/controllers/ReportesEstado.controller";
import { ReportesEstadoService } from "../modules/reportes/reportes-estado/application/services/ReportesEstado.service";
import { IReportesEstadoRepository } from "../modules/reportes/reportes-estado/domain/repositories/IReportesEstado.repository";
import { ReportesEstadoRepository } from "../modules/reportes/reportes-estado/infraestructure/repositories/ReportesEstado.repository";

import { ReportesTipoController } from "../modules/reportes/reportes-tipo/presentation/controllers/ReportesTipo.controller";
import { ReportesTipoService } from "../modules/reportes/reportes-tipo/application/services/ReportesTipo.service";
import { IReportesTipoRepository } from "../modules/reportes/reportes-tipo/domain/repositories/IReportesTipo.repository";
import { ReportesTipoRepository } from "../modules/reportes/reportes-tipo/infraestructure/repositories/ReportesTipo.repository";

import { ReportesPeriodoDescripcionController } from "../modules/reportes/reportes-periodo-descripcion/presentation/controllers/ReportesPeriodoDescripcion.controller";
import { ReportesPeriodoDescripcionService } from "../modules/reportes/reportes-periodo-descripcion/application/services/ReportesPeriodoDescripcion.service";
import { IReportesPeriodoDescripcionRepository } from "../modules/reportes/reportes-periodo-descripcion/domain/repositories/IReportesPeriodoDescripcion.repository";
import { ReportesPeriodoDescripcionRepository } from "../modules/reportes/reportes-periodo-descripcion/infraestructure/repositories/ReportesPeriodoDescripcion.repository";

import { IReportesRepository } from "../modules/reportes/reportes/domain/repositories/IReportes.repository";
import { ReportesRepository } from "../modules/reportes/reportes/infraestructure/repositories/Reportes.repository";
import { ReportesService } from "../modules/reportes/reportes/application/services/Reportes.service";
import { ReportesController } from "../modules/reportes/reportes/presentation/controllers/Reportes.controller";

import { IReportesTipoEncargadoRepository } from "../modules/reportes/reportes_tipo_encargado/domain/repositories/IReportesTipoEncargado.repository";
import { ReportesTipoEncargadoService } from "../modules/reportes/reportes_tipo_encargado/application/services/ReportesTipoEncargado.service";
import { ReportesTipoEncargadoController } from "../modules/reportes/reportes_tipo_encargado/presentation/controllers/ReportesTipoEncargado.controller";
import { ReportesTipoEncargadoRepository } from "../modules/reportes/reportes_tipo_encargado/infraestructure/repositories/ReportesTipoEncargado.repository";

import { IReportesMesPlantadorRepository } from "../modules/reportes/reportes-mes-plantador/domain/repositories/IReportesMesPlantador.repository";
import { ReportesMesPlantadorService } from "../modules/reportes/reportes-mes-plantador/application/services/ReportesMesPlantador.service";
import { ReportesMesPlantadorController } from "../modules/reportes/reportes-mes-plantador/presentation/controllers/ReportesMesPlantador.controller";
import { ReportesMesPlantadorRepository } from "../modules/reportes/reportes-mes-plantador/infraestructure/repositories/ReportesMesPlantador.repository";
import { IReportesFinanzasMensualesRepository } from "../modules/reportes/reportes-finanzas-mensuales/domain/repositories/IReportesFinanzasMensuales.repository";
import { ReportesFinanzasMensualesService } from "../modules/reportes/reportes-finanzas-mensuales/application/services/ReportesFinanzasMensuales.service";
import { ReportesFinanzasMensualesController } from "../modules/reportes/reportes-finanzas-mensuales/presentation/controllers/ReportesFinanzasMensuales.controller";
import { ReportesFinanzasMensualesRepository } from "../modules/reportes/reportes-finanzas-mensuales/infraestructure/repositories/ReportesFinanzasMensuales.repository";

export const registerReportesDependencies = () => {
    container.registerInstance(DataSource, AppDataSource);

    //REPORTES PERIODO
    container.register<IReportesPeriodoRepository>("IReportesPeriodoRepository", { useClass: ReportesPeriodoRepository });
    container.register(ReportesPeriodoService, { useClass: ReportesPeriodoService });
    container.register(ReportesPeriodoController, { useClass: ReportesPeriodoController });

    //REPORTES ESTADO
    container.register<IReportesEstadoRepository>("IReportesEstadoRepository", { useClass: ReportesEstadoRepository });
    container.register(ReportesEstadoService, { useClass: ReportesEstadoService });
    container.register(ReportesEstadoController, { useClass: ReportesEstadoController });

    // REPORTES TIPO
    container.register<IReportesTipoRepository>("IReportesTipoRepository", { useClass: ReportesTipoRepository });
    container.register(ReportesTipoService, { useClass: ReportesTipoService });
    container.register(ReportesTipoController, { useClass: ReportesTipoController });

    // REPORTES PERIODO DESCRIPCION
    container.register<IReportesPeriodoDescripcionRepository>("IReportesPeriodoDescripcionRepository", { useClass: ReportesPeriodoDescripcionRepository });
    container.register(ReportesPeriodoDescripcionService, { useClass: ReportesPeriodoDescripcionService });
    container.register(ReportesPeriodoDescripcionController, { useClass: ReportesPeriodoDescripcionController });

    // REPORTES
    container.register<IReportesRepository>("IReportesRepository", { useClass: ReportesRepository });
    container.register(ReportesService, { useClass: ReportesService });
    container.register(ReportesController, { useClass: ReportesController });

    // REPORTES TIPO ENCARGADO
    container.register<IReportesTipoEncargadoRepository>("IReportesTipoEncargadoRepository", { useClass: ReportesTipoEncargadoRepository });
    container.register(ReportesTipoEncargadoService, { useClass: ReportesTipoEncargadoService });
    container.register(ReportesTipoEncargadoController, { useClass: ReportesTipoEncargadoController });

    // REPORTES MES PLANTADOR
    container.register<IReportesMesPlantadorRepository>("IReportesMesPlantadorRepository", { useClass: ReportesMesPlantadorRepository });
    container.register(ReportesMesPlantadorService, { useClass: ReportesMesPlantadorService });
    container.register(ReportesMesPlantadorController, { useClass: ReportesMesPlantadorController });

    // REPORTES FINANZAS MENSUALES
    // Registrar repositorio usando el constructor directamente para evitar overloads de tsyringe
    container.register<IReportesFinanzasMensualesRepository>("IReportesFinanzasMensualesRepository", ReportesFinanzasMensualesRepository as any);
    container.register(ReportesFinanzasMensualesService, { useClass: ReportesFinanzasMensualesService });
    container.register(ReportesFinanzasMensualesController, { useClass: ReportesFinanzasMensualesController });

}
