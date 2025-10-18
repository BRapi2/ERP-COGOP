import React, { useMemo } from 'react';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { FaDatabase } from 'react-icons/fa';
import DataTable from './DataTable';

const Table = ({ data, isLoading, error, sortConfig, handleSort, columnsConfig, onEdit, onDelete }) => {
    const columns = useMemo(
        () => columnsConfig({ onEdit, onDelete, isLoading }),
        [columnsConfig, onEdit, onDelete, isLoading]
    );

    if (isLoading && !data?.length) {
        return (
            <Container fluid className={`pageContainer d-flex justify-content-center align-items-center`} style={{ minHeight: '80vh' }}>
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <span className="ms-3 fs-4 text-primary">Cargando datos...</span>
            </Container>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center">Error al cargar datos: {error.message}</Alert>;
    }

    if (!isLoading && data && data.length === 0) {
        return (
            <div className={"noDataMessage"}>
                <FaDatabase size={48} className="mb-3" />
                <h4>No se encontraron datos</h4>
                <p>Intente ajustar los filtros o agregue nuevos datos.</p>
            </div>
        );
    }

    return (
        <>
            <div className="loading-overlay">
                {isLoading && data && data.length > 0 && (
                    <div className={"loadingOverlay"}>
                        <Spinner animation="border" variant="primary" /> <span className="ms-2">Actualizando...</span>
                    </div>
                )}
            </div>
            {data && data.length > 0 && (
                <DataTable
                    columns={columns}
                    data={data || []}
                    rowKeyField="id"
                    currentSortConfig={sortConfig}
                    onSort={handleSort}
                />
            )}


        </>

    );
};

export default Table;