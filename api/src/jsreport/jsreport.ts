import JsReport from 'jsreport-core';
import jsrender from 'jsreport-jsrender';
import chromePdf from 'jsreport-chrome-pdf';
import assets from 'jsreport-assets';

const jsreport = JsReport();

jsreport.use(jsrender());
jsreport.use(chromePdf());
jsreport.use(assets());

// ✅ Registrar helpers globales al inicializar
jsreport.beforeRenderListeners.add('registerHelpers', (req, res) => {
    req.template.helpers = `
    function formatDate(dateStr) {
      if (!dateStr) return "";
      try {
        const d = new Date(dateStr);
        return d.toLocaleDateString("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      } catch {
        return dateStr;
      }
    }

    // estos helpers son reemplazados automáticamente por chrome-pdf
    function currentPage() { return ""; }
    function totalPages() { return ""; }
  `;
});

let initialized = false;

export async function initJsReport() {
    if (!initialized) {
        await jsreport.init();
        initialized = true;
    }
    return jsreport;
}
