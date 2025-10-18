import { useState, useEffect, useCallback } from 'react';
import { getApiUrl } from '../../../api';

const useFetchPaginatedDataUrl = (endpointPath, paramsConfig = {}, { enabled = true } = {}) => {
    const [data, setData] = useState(null);
    const [dataTotal, setDataTotal] = useState(null);
    const [dataPaginacion, setDataPaginacion] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const stringifiedParamsConfig = JSON.stringify(paramsConfig);

    const fetchData = useCallback(
        async (signal) => {
            if (!enabled) return; // <- 👈 aquí frenamos el fetch

            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error("Usuario no autenticado.");

                const { pageNumber, pageSize, sort, ...otrosFiltros } = JSON.parse(stringifiedParamsConfig);
                const queryBuilder = new URLSearchParams();

                if (pageNumber !== undefined) queryBuilder.append('page', pageNumber.toString());
                if (pageSize !== undefined) queryBuilder.append('size', pageSize.toString());
                if (sort) queryBuilder.append('sort', sort);

                for (const key in otrosFiltros) {
                    if (
                        Object.hasOwnProperty.call(otrosFiltros, key) &&
                        otrosFiltros[key] !== undefined &&
                        otrosFiltros[key] !== null &&
                        String(otrosFiltros[key]).trim() !== ''
                    ) {
                        queryBuilder.append(key, otrosFiltros[key].toString());
                    }
                }

                const queryString = queryBuilder.toString();
                const fetchUrl = `${getApiUrl(endpointPath)}${queryString ? `?${queryString}` : ''}`;

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
                const menuExists = localStorage.getItem('menu') !== null;
                headers[menuExists ? 'CustomToken' : 'Authorization'] = menuExists
                    ? token
                    : 'Bearer ' + token;

                const response = await fetch(fetchUrl, { method: 'GET', headers, signal });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
                }

                const responseData = await response.json();
                let rolesArr = [];

                if (responseData.data && (responseData.status === 'SUCCESS' || responseData.status === 'success')) {
                    if (responseData.data.lista) {
                        setData(responseData.data.lista.content);
                        setDataPaginacion(responseData.data.lista);
                        if (Array.isArray(responseData.data.lista.roles)) rolesArr = responseData.data.lista.roles;
                    } else if (responseData.data.content) {
                        setData(responseData.data.content);
                        setDataPaginacion(responseData.data);
                        if (Array.isArray(responseData.data.roles)) rolesArr = responseData.data.roles;
                    } else if (responseData.data.data) {
                        setData(responseData.data.data);
                        setDataPaginacion(responseData.data);
                        if (Array.isArray(responseData.data.roles)) rolesArr = responseData.data.roles;
                    } else {
                        setData(responseData.data);
                        setDataPaginacion(responseData.data);
                        if (Array.isArray(responseData.data.roles)) rolesArr = responseData.data.roles;
                    }
                    setDataTotal(responseData.data);
                    setRoles(rolesArr);
                } else {
                    throw new Error(responseData.message || "Respuesta inesperada del servidor.");
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error(`Error en useFetchPaginatedDataUrl (${endpointPath}):`, err);
                    setError(err.message || `Error al cargar datos desde ${endpointPath}.`);
                }
            } finally {
                if (!signal || !signal.aborted) setIsLoading(false);
            }
        },
        [endpointPath, stringifiedParamsConfig, enabled]
    );

    useEffect(() => {
        if (!enabled) return; // <- 👈 evita correr el efecto cuando no toca
        const controller = new AbortController();
        fetchData(controller.signal);
        return () => controller.abort();
    }, [fetchData, enabled]);

    return {
        items: data,
        roles,
        adicional: dataTotal,
        paginationInfo: dataPaginacion
            ? {
                number: dataPaginacion.number,
                size: dataPaginacion.size,
                totalPages: dataPaginacion.totalPages,
                totalElements: dataPaginacion.totalElements,
                sort: dataPaginacion.sort,
            }
            : null,
        isLoading,
        error,
        refetch: () => {
            if (!enabled) return;
            const newController = new AbortController();
            fetchData(newController.signal);
        },
    };
};

export default useFetchPaginatedDataUrl;
