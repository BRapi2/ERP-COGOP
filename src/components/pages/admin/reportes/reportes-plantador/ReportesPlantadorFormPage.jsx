/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, createContext, useContext } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useFetchPaginatedData from "../../../../service/useFetchPaginatedData";
import useSubmitData from "../../../../service/useSubmitData";
import { toast } from "react-toastify";
import CampoMisioneroSection from "./sections/CampoMisioneroSection";
import EstadisticosMensualesSection from "./sections/EstadisticosMensualesSection";
import EstadisticaTotalSection from "./sections/EstadisticaTotalSection";
import ComentarioSection from "./sections/ComentarioSection";

// CONTEXT SETUP
const LocalDataContext = createContext(null);
const useDataContext = () => {
    const context = useContext(LocalDataContext);
    if (!context) {
        throw new Error("useDataContext debe usarse dentro de LocalDataProvider");
    }
    return context;
};

const LocalDataProvider = ({ children, id }) => {
    const {
        items: data,
        adicional,
        isLoading,
        error,
        refetch,
    } = useFetchPaginatedData(`reportes/${id}`);

    const {
        submitData,
        responseData,
        isLoading: isSubmitting,
        error: submitError,
        clearError,
        clearResponseData,
    } = useSubmitData();

    const save = async (dto) => {
        await submitData("reportes/guardar", "POST", dto);
    };

    const value = {
        data,
        adicional,
        isLoading,
        error,
        refetch,
        save,
        isSubmitting,
        submitError,
        responseData,
        clearError,
        clearResponseData,
    };

    return (
        <LocalDataContext.Provider value={value}>
            {children}
        </LocalDataContext.Provider>
    );
};

const ReportesPlantadorFormContent = () => {

    console.log("Estas en Plantador")

    const navigate = useNavigate();
    const {
        data,
        adicional,
        isLoading,
        error,
        refetch,
        save,
        isSubmitting,
        responseData,
        clearError,
        clearResponseData,
    } = useDataContext();

    const campoRef = useRef();
    const estadMensualesRef = useRef();
    const estadTotalRef = useRef();
    const comentarioRef = useRef();

    const displayOverallLoading = isLoading || isSubmitting;

    useEffect(() => {
        if (responseData) {
            toast.success("Reporte actualizado exitosamente!");
            clearResponseData();
            navigate("/secretario/reportes");
        }
    }, [responseData, clearResponseData, navigate]);

    const normalizarDatos = (obj) => {
        if (Array.isArray(obj)) return obj.map(normalizarDatos);
        if (obj && typeof obj === "object") {
            const nuevo = {};
            for (const key in obj) {
                const valor = obj[key];
                if (valor === "") nuevo[key] = null;
                else if (valor && typeof valor === "object" && "id" in valor && (valor.id === null || valor.id === "")) nuevo[key] = null;
                else nuevo[key] = normalizarDatos(valor);
            }
            return nuevo;
        }
        return obj;
    };

    const extraerSoloIds = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;

        const nuevo = {};
        for (const key in obj) {
            const valor = obj[key];
            if (valor && typeof valor === 'object' && 'id' in valor) {
                nuevo[key] = { id: valor.id ?? null };
            } else {
                nuevo[key] = extraerSoloIds(valor);
            }
        }

        return nuevo;
    };

    const handleSave = async () => {
        clearError();

        const campo = campoRef.current?.getCampoMisionero();
        const estadMensuales = estadMensualesRef.current?.getEstadisticosMensuales();
        const estadTotal = estadTotalRef.current?.getEstadisticaTotal();
        const comentario = comentarioRef.current?.getComentario();

        // Combinar los datos de todas las sections
        const reportesData = normalizarDatos({
            ...campo,
            ...estadMensuales,
            ...estadTotal,
            ...comentario
        });

        // Normalizar la data base del reporte, extrayendo solo ids en relaciones
        const dataNormalizada = extraerSoloIds(data);

        // Eliminar el campo 'extra' para que no se envíe
        delete dataNormalizada.extra;
        delete dataNormalizada.data;

        // -------------------------------
        // Dinámica para determinar el nombre del objeto y el id
        // En este form page es: "reportesMesPlantador"
        // Para otros forms, cambiar el nombre del objeto aquí
        const nombreObjeto = "reportesMesPlantador";

        const idGuardado = data?.extra?.id ?? data?.data ?? null;
        if (idGuardado) {
            reportesData.id = idGuardado;
        }
        // -------------------------------

        // Crear DTO final a enviar
        const dto = {
            ...dataNormalizada,
            [nombreObjeto]: reportesData
        };

        try {
            await save(dto);
        } catch (err) {
            // Ya manejado
        }
    };

    const handleCancel = () => navigate("/secretario/reportes");

    if (displayOverallLoading && (!data || Object.keys(data).length === 0)) {
        return (
            <Container fluid className="pageContainer d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <span className="ms-3 fs-4 text-primary">Cargando datos...</span>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <h4>Error al cargar los datos</h4>
                <p>{error}</p>
                <Button variant="secondary" onClick={refetch}>Reintentar</Button>
            </Container>
        );
    }

    return (
        <div className="pageContainer">
            <div className="text-center mb-4">
                <h5 className="mb-1">REPORTE DEL PLANTADOR DE IGLESIA LOCAL</h5>
                <h6 className="text-muted">
                    {data?.reportesPeriodoDescripcion?.nombre} - {data?.year}
                </h6>
            </div>

            <div className="mb-4">
                <h6 className="mb-2">Responsable:</h6>
                <div><strong>Nombre:</strong> {data?.nombres} {data?.apellidos}</div>
                <div><strong>Email:</strong> {data?.email}</div>
                <div><strong>Teléfono:</strong> {data?.telefono}</div>
            </div>

            <CampoMisioneroSection ref={campoRef} reporte={data} catalogos={adicional} />
            <EstadisticosMensualesSection ref={estadMensualesRef} reporte={data} catalogos={adicional} />
            <EstadisticaTotalSection ref={estadTotalRef} reporte={data} catalogos={adicional} />
            <ComentarioSection ref={comentarioRef} reporte={data} catalogos={adicional} />

            <Row className="mt-4">
                <Col className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Guardando...
                            </>
                        ) : "Guardar"}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

const ReportesPlantadorFormPage = () => {
    const { id } = useParams();
    return (
        <LocalDataProvider id={id}>
            <ReportesPlantadorFormContent />
        </LocalDataProvider>
    );
};

export default ReportesPlantadorFormPage;
