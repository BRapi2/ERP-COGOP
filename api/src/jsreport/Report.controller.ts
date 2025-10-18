import { ReportDto } from "./ReportDto";
import { initJsReport } from "./jsreport";
export class ReportController {
  async generate(dto: ReportDto) {
    const jsreport = await initJsReport();

    const data = dto.data;

    if (!data.reportesTipo) {
      throw new Error("No se encontró el tipo de reporte.");
    }

    const tipoId = data.reportesTipo.id;

    let template = "";

    if (tipoId === 6) {
      const mes = data.reportesPeriodoDescripcion?.nombre || '';
      const year = data.year || '';
      const distrito = data.iglesia?.distrito?.nombre || '';
      const extra = data.extra || {};
      const reporteEncargado = data.reportesTipo.reportesTipoEncargado?.[0] || {};
      const iglesiaNombre = data.iglesia?.nombre || '';
      const nombreResponsable = `${data.nombres} ${data.apellidos}`;
      const emailResponsable = data.email || '';
      const telefonoResponsable = data.telefono || '';

      const fillRect = (value: any) => `
    <div style="display:inline-block; width:70px; border:1px solid #000; padding:2px; text-align:center;">
      ${value ?? ''}
    </div>
  `;

      const fillText = (value: any) => `
    <span style="text-decoration:underline;">${value ?? ''}</span>
  `;

      // Cuadro de Sí/No más compacto
      const markSN = (value: string) => `
    <div style="display:flex; width:70px; border:1px solid #000; text-align:center;">
      <div style="flex:1; padding:2px; background:${value === 'Sí' ? '#000' : 'transparent'}; color:${value === 'Sí' ? '#fff' : '#000'};">Sí</div>
      <div style="flex:1; padding:2px; background:${value === 'No' ? '#000' : 'transparent'}; color:${value === 'No' ? '#fff' : '#000'};">No</div>
    </div>
  `;

      template = `
<html>
  <head>
    <style>
      @page { size: A4; margin: 0; }

      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: Arial, sans-serif;
        font-size: 13px;
        line-height: 1.35;
        color: #000;
        background: white;
        box-sizing: border-box;
        position: relative;
      }

      body {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }

      .watermark {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.15;
        z-index: 0;
        width: 100%;
        height: auto;
        pointer-events: none;
      }

      .content {
        position: relative;
        z-index: 1;
        padding: 20px 35px;
      }

      * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      h2, h3 { text-align:center; margin-bottom:6px; }
      h2.bold { font-size:17px; }
      h3 { font-size:15px; }
      .section { margin-top:12px; }
      .bold { font-weight:bold; }
      .underline { text-decoration:underline; }
      .field-row { display:flex; justify-content:space-between; margin-bottom:3px; }
      .text-field { margin-bottom:3px; }
      .divider { border-top:1px dotted #000; margin:10px 0; }
    </style>
  </head>
  <body>
    <!-- Marca de agua -->
    <img
      class="watermark"
      src="https://raw.githubusercontent.com/manuel1812589/COGOP-images/7420160d1c221b73e3a2f6a4180f121c4f17d2c0/bandera.jpeg"
    />

    <div class="content">

      <!-- Encabezado -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px;">
        <div style="flex:0 0 auto;">
          <img 
            src="https://raw.githubusercontent.com/manuel1812589/COGOP-images/7420160d1c221b73e3a2f6a4180f121c4f17d2c0/plantador.jpeg" 
            style="height:90px; object-fit:contain;" 
          />
        </div>

        <div style="flex:1; text-align:center;">
          <h2 class="bold" style="margin:0;">
            DEPARTAMENTO DE IGLECRECIMIENTO Y PLANTACIÓN DE IGLESIAS<br>
            REPORTE MENSUAL DEL PLANTADOR (G.P.S.) Y<br>
            OBRERO DEL CAMPO MISIONERO
          </h2>
          <h3 style="margin-top:5px;">Correspondiente al mes de: ${mes} ${year}</h3>
        </div>

        <div style="flex:0 0 auto;">
          <img 
            src="https://raw.githubusercontent.com/manuel1812589/COGOP-images/c5716c0d758e433969b651b4c3d3a49cd2b65357/logo.jpeg" 
            style="height:90px; object-fit:contain;" 
          />
        </div>
      </div>

      <!-- Datos generales -->
      <div class="section">
        <div class="text-field"><b>Iglesia en:</b> ${iglesiaNombre} &nbsp;&nbsp; <b>N° Área:</b> 1 &nbsp;&nbsp; <b>N° Distrito:</b> 2</div>
        <div class="text-field"><b>Nombre del Responsable:</b> ${nombreResponsable}</div>
        <div class="text-field"><b>Teléfono:</b> ${telefonoResponsable} &nbsp;&nbsp; <b>E-mail:</b> ${emailResponsable}</div>
      </div>

      <div class="divider"></div>

      <!-- Información del campo -->
      <div class="section">
        <p class="bold underline">INFORMACIÓN DEL CAMPO MISIONERO:</p>
        <div class="text-field">• Iglesia Central o Misión a la que pertenece: ${fillText(iglesiaNombre)}</div>
        <div class="text-field">• Dirección Completa del Campo Misionero: ${fillText(extra.direccion_completa)}</div>
        <div class="text-field">• Fecha proyectada para ser una Misión organizada: ${fillText(extra.fecha_proyectada_mision)}</div>
      </div>

      <div class="divider"></div>

      <!-- Datos estadísticos mensuales -->
      <div class="section">
        <p class="bold underline">DATOS ESTADÍSTICOS MENSUALES:</p>
        <div class="field-row"><div>• Nuevos contactos:</div><div>${fillRect(extra.nro_nuevos_contactos)}</div></div>
        <div class="field-row"><div>• Nuevas conversiones:</div><div>${fillRect(extra.nro_nuevas_conversiones)}</div></div>
        <div class="field-row"><div>• N° consolidando:</div><div>${fillRect(extra.nro_consolidados)}</div></div>
        <div class="field-row"><div>• N° discipulado:</div><div>${fillRect(extra.nro_discipulados)}</div></div>
        <div class="field-row"><div>• Bautizados en agua:</div><div>${fillRect(extra.nro_bautizados_agua)}</div></div>
        <div class="field-row"><div>• Nuevos G.D.C.:</div><div>${fillRect(extra.nro_nuevos_gdc)}</div></div>
        <div class="field-row"><div>• Nuevas personas en los G.D.C.:</div><div>${fillRect(extra.nro_nuevas_personas_gdc)}</div></div>
        <div class="field-row"><div>• Nuevos líderes con G.D.C.:</div><div>${fillRect(extra.nro_nuevos_lideres_gdc)}</div></div>
      </div>

      <div class="divider"></div>

      <!-- Estadística total -->
      <div class="section">
        <p class="bold underline">ESTADÍSTICA TOTAL:</p>
        <div class="field-row"><div>• Número de creyentes:</div><div>${fillRect(extra.nro_creyentes)}</div></div>
        <div class="field-row"><div>• Número de miembros:</div><div>${fillRect(extra.nro_miembros)}</div></div>
        <div class="field-row"><div>• Número de líderes de G.D.C.:</div><div>${fillRect(extra.nro_lideres_gdc)}</div></div>
        <div class="field-row"><div>• Total de personas en G.D.C.:</div><div>${fillRect(extra.total_personas_gdc)}</div></div>
        <div class="field-row"><div>• Total de personas discipuladas:</div><div>${fillRect(extra.total_personas_discipulados)}</div></div>
        <div class="field-row"><div>• ¿Le visitó el pastor de la iglesia central?</div><div>${markSN(extra.visita_pastor_iglesia_central)}</div></div>
        <div class="field-row"><div>• ¿Contó con la visita del Supervisor de Distrito?</div><div>${markSN(extra.visita_supervisor_distrital)}</div></div>
      </div>

      <div class="divider"></div>

      <!-- Comentario -->
      <div class="section">
        <p class="bold underline">COMENTARIO:</p>
        <p>${extra.comentario || ''}</p>
      </div>

      <div class="divider"></div>

      <div style="text-align:right; font-weight:bold; margin-top:40px;">OFICINA NACIONAL</div>
    </div>
  </body>
</html>
`;
    }

    // Si no es ninguno de los tipos manejados
    else {
      throw new Error("Tipo de reporte no soportado.");
    }

    const result = await jsreport.render({
      template: {
        content: template,
        engine: "jsrender",
        recipe: "chrome-pdf",
      },
      data: dto,
    });

    return result.content;
  }
}
