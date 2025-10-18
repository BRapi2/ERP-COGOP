import { useState, useCallback } from 'react';
import { getApiUrl } from '../../../api';

const useRemoteSearch = (endpointPath) => {
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const search = useCallback(async (searchValue) => {
        setIsSearching(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'CustomToken': token
            };

            const query = new URLSearchParams();
            query.append('search', searchValue);
            query.append('page', 0);
            query.append('size', 20);

            const fetchUrl = `${getApiUrl(endpointPath)}?${query.toString()}`;
            const response = await fetch(fetchUrl, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Error en la búsqueda.');
            }

            const json = await response.json();
            const lista = json?.data?.lista?.content || json?.data?.content || json?.data || [];
            setResults(Array.isArray(lista) ? lista : []);

        } catch (err) {
            console.error(`Error en ${endpointPath}:`, err);
            setError(err.message || 'Error desconocido.');
        } finally {
            setIsSearching(false);
        }
    }, [apiUrl, endpointPath]);

    return {
        results,
        isSearching,
        error,
        search
    };
};

export default useRemoteSearch;
