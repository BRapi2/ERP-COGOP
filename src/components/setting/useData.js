import { useState, useCallback, useMemo } from 'react';
import useFetchPaginatedData from '../service/useFetchPaginatedData';
import useSubmitData from '../service/useSubmitData';
import { toast } from 'react-toastify';

const useData = (service) => { 
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });
    const [searchFilter, setSearchFilter] = useState('');

    const queryParams = useMemo(() => ({
        page: pageNumber,
        size: pageSize,
        search: searchFilter,
        sort: `${sortConfig.field},${sortConfig.direction}`
    }), [pageNumber, pageSize, searchFilter, sortConfig]);

    const {
        items: data,
        roles,
        adicional,
        paginationInfo,
        isLoading: isLoadingData,
        error,
        refetch
    } = useFetchPaginatedData(service.getEndpoint(), queryParams);

    const { submitData, isLoading: isSubmitting } = useSubmitData();

    const handleSort = useCallback((fieldKey) => {
        const direction = sortConfig.field === fieldKey && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ field: fieldKey, direction });
        setPageNumber(0);
    }, [sortConfig]);

    const handleSearch = useCallback((searchValue) => {
        setSearchFilter(searchValue);
        setPageNumber(0);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setPageNumber(newPage);
    }, []);

    const handlePageSizeChange = useCallback((newSize) => {
        setPageSize(newSize);
        setPageNumber(0);
    }, []);

    const save = useCallback(async (formData) => {
        const isEditMode = !!formData.id;
        try {
            const endpoint = isEditMode
                ? service.updateEndpoint(formData.id)
                : service.createEndpoint();

            await submitData(endpoint, 'POST', formData);
            toast.success(`Datos guardados correctamente`);
            refetch();
        } catch (err) {
            toast.error(err.message || 'Error al guardar los datos');
            throw err;
        }
    }, [submitData, refetch, service]);

    const isLoading = isLoadingData || isSubmitting;

    return {
        data,
        roles,
        adicional,
        paginationInfo,
        isLoading,
        error,
        sortConfig,
        currentPageSize: pageSize,
        refetch,
        handleSort,
        handleSearch,
        handlePageChange,
        handlePageSizeChange,
        save
    };
};

export default useData;