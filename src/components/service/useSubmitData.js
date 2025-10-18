import { useState, useCallback } from 'react';
import { getApiUrl } from '../../../api';
const useSubmitData = () => {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);
  const clearResponseData = useCallback(() => setResponseData(null), []);

  const submitData = useCallback(async (endpointPath, method = 'POST', bodyData = null) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    let signal;
    const controller = new AbortController();
    signal = controller.signal;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Usuario no autenticado. No se puede enviar la solicitud.");
      }

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      const menuExists = localStorage.getItem('menu') !== null;
      if (menuExists) {
        headers['CustomToken'] = token;
      } else {
        headers['Authorization'] = 'Bearer ' + token;
      }
      const fetchOptions = {
        method: method.toUpperCase(),
        headers: headers,
        signal
      };

      if (bodyData && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
        fetchOptions.body = JSON.stringify(bodyData);
      }
      const fetchUrl = getApiUrl(endpointPath);


      const response = await fetch(fetchUrl, fetchOptions);

      if (signal && signal.aborted) {
        throw new DOMException('Petición abortada por el usuario.', 'AbortError');
      }

      const responseText = await response.text();
      let parsedData;
      try {
        parsedData = responseText ? JSON.parse(responseText) : null;
      } catch (e) {
        console.error("Error al parsear respuesta JSON:", e, "Texto de respuesta:", responseText);
        throw new Error(`Respuesta inesperada del servidor (no es JSON válido): ${response.status} ${response.statusText}`);
      }
      if (!response.ok) {
        console.error(`Error en la respuesta del servidor (${response.status}):`, parsedData);
        throw { ...parsedData, statusCode: response.status };
      }
      if (parsedData && parsedData.status === 'SUCCESS') {
        setResponseData(parsedData);
        return parsedData;
      } else {
        setResponseData(null);
        return null;
      }

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(`Error en useSubmitData (${method} ${endpointPath}):`, err);
        setError(err || `Error al enviar datos a ${endpointPath}.`);
        throw err;
      }
    } finally {
      if (!signal || !signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  return {
    submitData,
    responseData,
    isLoading,
    error,
    clearError,
    clearResponseData
  };
};

export default useSubmitData;
