import { useState, useCallback } from 'react';
import { getApiUrl } from '../../../api';
import { toast } from 'react-toastify';

const useReportPdf = () => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Genera un PDF para:
   * - tipo = "reporte" → usa /report/pdf
   * - tipo = "pastoral" → usa /report/ficha-pastoral
   */
  const generatePdf = useCallback(async (id, tipo = "reporte") => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Usuario no autenticado.");

      const menuExists = localStorage.getItem('menu') !== null;
      const headersReq = { 'Content-Type': 'application/json' };
      if (menuExists) headersReq['CustomToken'] = token;

      // 1️⃣ URL base según tipo
      const endpoint = tipo === "pastoral"
        ? `ficha-pastoral/${id}`
        : `reportes/${id}`;

      const res = await fetch(getApiUrl(endpoint), {
        method: 'GET',
        headers: headersReq,
      });

      if (!res.ok) throw new Error("No se pudo obtener la información del registro");

      const data = await res.json();
      const fullData = data?.data?.content;
      if (!fullData) throw new Error("No se encontró información válida");

      // 2️⃣ Endpoint de PDF según tipo
      const pdfEndpoint = tipo === "pastoral"
        ? '/report/ficha-pastoral'
        : '/report/pdf';

      const pdfHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
      };
      if (menuExists) pdfHeaders['CustomToken'] = token;

      const pdfRes = await fetch(getApiUrl(pdfEndpoint), {
        method: 'POST',
        headers: pdfHeaders,
        body: JSON.stringify({ data: fullData }),
      });

      if (!pdfRes.ok)
        throw new Error(`Error en la generación del PDF: ${pdfRes.status}`);

      const blob = await pdfRes.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = tipo === "pastoral" ? 'ficha_pastoral.pdf' : 'reporte.pdf';
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Error generando PDF:", err);
      toast.error("Error al generar PDF");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generatePdf, isLoading };
};

export default useReportPdf;
