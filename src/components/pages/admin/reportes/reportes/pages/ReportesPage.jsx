/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import { Card, Button, Row, Col, Form, Container, Spinner, Offcanvas } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaPlus, FaFileAlt, FaEdit, FaAngleDoubleRight, FaPrint } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useFetchPaginatedDataUrl from '../../../../../service/useFetchPaginatedDataUrl';
import useSubmitData from '../../../../../service/useSubmitData';
import useReportPdf from '../../../../../service/useReportPdf';
import DataTable from '../../../../../setting/DataTable';
import ReusablePagination from '../../../../../setting/ReusablePagination';
import GenericFormModal from '../../../../../setting/GenericFormModal';
import { useFilters } from '../../../../../../FilterContext';
import { useAuth } from '../../../../../../AuthContext';


const ReportesPage = () => {
  const navigate = useNavigate();
  const { user, rolesMap } = useAuth();
  const { iglesia } = useFilters();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });
  const [searchFilter, setSearchFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    periodo: '',
    tipoReporte: '',
    estado: ''
  });
  const { generatePdf, isLoading: isPrinting } = useReportPdf();

  const queryParams = {
    page: pageNumber,
    size: pageSize,
    search: searchFilter,
    sort: `${sortConfig.field},${sortConfig.direction}`,
  };

  const {
    items: data,
    adicional,
    paginationInfo,
    isLoading: isLoadingList,
    error: errorList,
    refetch,
  } = useFetchPaginatedDataUrl(
    `reportes/iglesia/${iglesia}`,
    queryParams,
    { enabled: !!iglesia } // 🚀 solo fetch si hay iglesia
  );
  const iglesiaSeleccionada = adicional?.iglesia?.find(i => i.id === parseInt(iglesia));

  const {
    submitData,
    responseData: submitResponseData,
    isLoading: isSubmitting,
    error: submitError,
    clearError: clearSubmitError,
    clearResponseData: clearSubmitResponseData
  } = useSubmitData();

  const displayOverallLoading = isLoadingList || isSubmitting;

  useEffect(() => {
    const combinedSearch = [
      filters.year ? `year:${filters.year}` : '',
      filters.periodo ? `periodo:${filters.periodo}` : '',
      filters.tipoReporte ? `tipoReporte:${filters.tipoReporte}` : '',
      filters.estado ? `estado:${filters.estado}` : ''
    ].filter(Boolean).join(' ');

    setSearchFilter(combinedSearch);
    setPageNumber(0);
  }, [filters]);

  useEffect(() => {
    if (submitResponseData) {
      toast.success('Reporte guardado exitosamente');
      refetch(new AbortController().signal);
      handleCloseModal();
      clearSubmitResponseData();
    }
  }, [submitResponseData, clearSubmitResponseData, refetch]);

  const handleSort = (fieldKey) => {
    const direction =
      sortConfig.field === fieldKey && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field: fieldKey, direction });
    setPageNumber(0);
  };

  const handlePageChange = (newPage) => setPageNumber(newPage);
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageNumber(0);
  };

  const handleEditRedirect = (id, item) => {
    const tipoReporteId = item?.reportesTipo?.id;

    if (tipoReporteId === 6) {
      navigate(`/secretario/reportes-plantador/update/${id}`);
    } else if (tipoReporteId === 2) {
      navigate(`/secretario/reportes-escuela-biblica/update/${id}`);
    } else if (tipoReporteId === 5) {
      navigate(`/secretario/reportes-ministerio-familia/update/${id}`);
    } else if (tipoReporteId === 3) {
      navigate(`/secretario/reportes-ministerio-jovenes/update/${id}`);
    } else if (tipoReporteId === 4) {
      navigate(`/secretario/reportes-ministerio-adolescentes/update/${id}`);
    } else if (tipoReporteId === 9) {
      navigate(`/secretario/reportes-ministerio-niños/update/${id}`);
    } else if (tipoReporteId === 1) {
      navigate(`/secretario/reportes-pastor-local/update/${id}`);
    } else if (tipoReporteId === 7) {
      navigate(`/secretario/reportes-pastor-mision/update/${id}`);
    } else {
      navigate(`/secretario/reportes-pastor-local/update/${id}`);
    }
  };

  const handleShowAddModal = () => {
    clearSubmitError();
    setFormData({
      reportesTipoId: '',
      tipoPeriodoId: '',
      reportesPeriodoDescripcionId: '',
      year: '',
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      direccion: '',
    });
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearSubmitError();
  };

  const handleSave = async (formData) => {
    clearSubmitError();
    const dtoParaEnviar = {
      id: formData.id,
      reportesTipo: formData.reportesTipoId ? { id: parseInt(formData.reportesTipoId) } : null,
      reportesPeriodoDescripcion: formData.reportesPeriodoDescripcionId ? { id: parseInt(formData.reportesPeriodoDescripcionId) } : null,
      year: formData.year ? parseInt(formData.year) : null,
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      telefono: formData.telefono ? parseInt(formData.telefono) : null,
      email: formData.email,
      direccion: formData.direccion,
      iglesia: { id: parseInt(iglesia) },
      reportesEstado: { id: 1 }
    };
    try {
      await submitData('reportes/guardar', 'POST', dtoParaEnviar);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      //
    }
  };

  const [formData, setFormData] = useState({
    reportesTipoId: '',
    tipoPeriodoId: '',
    reportesPeriodoDescripcionId: '',
    year: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const [tipoPeriodoBloqueado, setTipoPeriodoBloqueado] = useState(false);
  const periodosFiltrados = useMemo(() => {
    const periodoId = Number(formData.tipoPeriodoId || 0);
    if (!periodoId) return [];
    const todos = adicional?.reportesPeriodoDescripcion || [];
    return todos.filter(p => Number(p?.periodo?.id) === periodoId);
  }, [adicional?.reportesPeriodoDescripcion, formData.tipoPeriodoId]);

  const handleChange = (name, value) => {
    if (name === 'reportesTipoId') {
      const valueNum = Number(value) || 0;

      // Buscar el tipo de reporte seleccionado
      const tipoSel = (adicional?.reportesTipo || [])
        .find(t => Number(t.id) === valueNum);

      const tipoPeriodoId = tipoSel?.periodo?.id ? Number(tipoSel.periodo.id) : '';

      // Tomamos el primer encargado del reporte tipo (si existe)
      const encargado = tipoSel?.reportesTipoEncargado?.[0];

      // Datos del formulario
      setFormData(prev => ({
        ...prev,
        reportesTipoId: valueNum,
        tipoPeriodoId: tipoPeriodoId || '',
        reportesPeriodoDescripcionId: '',
      }));

      setTipoPeriodoBloqueado(Boolean(tipoPeriodoId));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickResend = async (item) => {
    const dtoParaEnviar = {
      id: item.id,
      reportesTipo: item.reportesTipo ? { id: item.reportesTipo.id } : null,
      reportesPeriodoDescripcion: item.reportesPeriodoDescripcion ? { id: item.reportesPeriodoDescripcion.id } : null,
      year: item.year,
      nombres: item.nombres,
      apellidos: item.apellidos,
      telefono: item.telefono,
      email: item.email,
      direccion: item.direccion,
      iglesia: { id: parseInt(iglesia) },
      reportesEstado: { id: 2 }, // Estado: Por validar
    };

    try {
      await submitData('reportes/guardar', 'POST', dtoParaEnviar);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('No se pudo reenviar el reporte');
    }
  };

  useEffect(() => {
    if (!formData.reportesTipoId) {
      setTipoPeriodoBloqueado(false);
    }
  }, [formData.reportesTipoId]);


  const getDerivedFields = (fieldName, value) => {
    if (fieldName === 'reportesTipoId') {
      const tipoSel = adicional?.reportesTipo?.find(t => Number(t.id) === Number(value));
      const tipoPeriodoId = tipoSel?.periodo?.id ? Number(tipoSel.periodo.id) : '';

      console.log("value seleccionado:", value);
      console.log("tipoSel encontrado:", tipoSel);
      console.log("tipoPeriodoId calculado:", tipoPeriodoId);

      return {
        reportesPeriodoDescripcionId: '',
        tipoPeriodoId,
      };
    }
    return {};
  };

  useEffect(() => {
    setTipoPeriodoBloqueado(Boolean(formData.tipoPeriodoId));
  }, [formData.tipoPeriodoId]);


  useEffect(() => {
    console.log("tipoPeriodoId:", formData.tipoPeriodoId);
    console.log("reportesPeriodoDescripcion:", adicional?.reportesPeriodoDescripcion);
  }, [formData.tipoPeriodoId, adicional?.reportesPeriodoDescripcion]);


  const formSchema = useMemo(() => [
    {
      name: 'reportesTipoId',
      label: 'Tipo de Reporte',
      type: 'select',
      options: [{ id: '', nombre: 'Seleccione un Tipo de Reporte' }, ...(adicional?.reportesTipo || [])],
      optionValueKey: 'id',
      optionLabelKey: 'nombre',
      required: true,
      onChange: (value) => handleChange('reportesTipoId', value),
    },
    {
      name: 'tipoPeriodoId',
      label: 'Tipo de Periodo',
      type: 'select',
      options: [{ id: '', nombre: 'Seleccione un Tipo de Periodo' }, ...(adicional?.tipoPeriodo || [])],
      optionValueKey: 'id',
      optionLabelKey: 'nombre',
      required: true,
      disabled: true,
    },
    {
      name: 'reportesPeriodoDescripcionId',
      label: 'Periodo',
      type: 'select',
      options: [{ id: '', nombre: 'Seleccione un Periodo' }, ...periodosFiltrados],
      optionValueKey: 'id',
      optionLabelKey: 'nombre',
      required: true,
    },
    { name: 'year', label: 'Año', type: 'number', required: true },
    { name: 'nombres', label: 'Nombres', type: 'text', required: true },
    { name: 'apellidos', label: 'Apellidos', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'text', required: true },
    { name: 'direccion', label: 'Dirección', type: 'text', required: true },
  ], [adicional, periodosFiltrados, tipoPeriodoBloqueado, formData.tipoPeriodoId]);

  const columnsConfig = useMemo(() => [
    {
      key: 'yearPeriodo',
      header: 'Año - Periodo',
      render: (item) => {
        const anio = item?.year ?? '';
        const periodo = item?.reportesPeriodoDescripcion?.nombre ?? '';
        return `${anio} - ${periodo}`;
      }
    },
    {
      key: 'tipoReporte',
      header: 'Tipo de Reporte',
      render: (item) => item?.reportesTipo?.nombre ?? ''
    },
    { key: 'email', header: 'Email', textAlign: 'center' },
    {
      key: 'reportesEstado',
      header: 'Estado',
      textAlign: 'center',
      render: (item) => {
        const estado = item?.reportesEstado?.nombre;
        const id = item?.reportesEstado?.id;

        const colorMap = {
          1: 'secondary', // Nuevo
          2: 'primary',   // Por validar
          3: 'warning',   // En proceso
          4: 'success',   // Validado
          5: 'info',    // Observado
        };

        const color = colorMap[id] || 'dark';

        return (
          <span className={`btn btn-sm btn-${color}`} disabled>
            {estado}
          </span>
        );
      },
    },
    {
      key: 'actions',
      header: 'Acciones',
      textAlign: 'center',
      render: (item) => (
        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => handleQuickResend(item)}
            disabled={isSubmitting}
            title="Enviar para validación"
          >
            {isSubmitting ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              <FaAngleDoubleRight />
            )}
          </Button>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleEditRedirect(item.id, item)}
            disabled={isSubmitting}
          >
            <FaEdit />
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => generatePdf(item.id, "reporte")} // solo pasamos el id
            disabled={isPrinting}
            title="Imprimir PDF"
          >
            {isPrinting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generando PDF...
              </>
            ) : (
              <FaPrint />
            )}
          </Button>
        </div>
      ),
    }
    ,
  ], [isSubmitting, isPrinting]);


  if ((!iglesia) || (isLoadingList && (!data || data.length === 0))) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 text-primary">Cargando reportes...</span>
      </Container>
    );
  }

  if (errorList && (!data || data.length === 0)) {
    return (
      <Container fluid className="text-center p-5">
        <Card body className="shadow-sm">
          <h4 className="text-danger">Error al cargar reportes</h4>
          <p>{errorList}</p>
          <Button onClick={() => refetch(new AbortController().signal)} disabled={displayOverallLoading}>
            Reintentar
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <div className="pageContainer">
      <Row className="headerRow">
        <Col xs={12} md={6}>
          <h2>Gestión de Reportes</h2>

          {iglesiaSeleccionada && (
            <>
              <div><strong>IDP:</strong> {iglesiaSeleccionada.nombre}</div>
              <div><strong>Cargo:</strong> {rolesMap[user?.rol]}</div>
            </>
          )}
        </Col>
        <Col xs={12} md={6} className="text-md-end">
          <Button variant="success" onClick={handleShowAddModal} disabled={displayOverallLoading}>
            <FaPlus className="me-2" /> Agregar
          </Button>
          <Button
            variant="danger"
            className="ms-2"
            disabled={isPrinting}
          >
            {isPrinting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generando PDF...
              </>
            ) : (
              <FaPrint />
            )}
          </Button>
        </Col>
      </Row>


      <Row className="controlsRow gy-2 align-items-center">
        <Col md={6}>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => setShowFilters(true)}
            disabled={displayOverallLoading}
          >
            Filtrar reportes
          </Button>

          <Offcanvas
            show={showFilters}
            onHide={() => setShowFilters(false)}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filtros de Reportes</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese año"
                    value={filters.year || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Periodo</Form.Label>
                  <Form.Select
                    value={filters.periodo || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, periodo: e.target.value }))}
                  >
                    <option value="">Todos</option>
                    {adicional?.reportesPeriodoDescripcion?.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>  // <-- usar nombre en vez de objeto
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Tipo de Reporte</Form.Label>
                  <Form.Select
                    value={filters.tipoReporte || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, tipoReporte: e.target.value }))}
                  >
                    <option value="">Todos</option>
                    {adicional?.reportesTipo?.map(tr => (
                      <option key={tr.id} value={tr.id}>{tr.nombre}</option>  // <-- nombre
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={filters.estado || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, estado: e.target.value }))}
                  >
                    <option value="">Todos</option>
                    {adicional?.reportesEstado?.map(e => (
                      <option key={e.id} value={e.id}>{e.nombre}</option>  // <-- nombre
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="secondary"
                  className="mt-2 w-100"
                  onClick={() => {
                    setFilters({ year: '', periodo: '', tipoReporte: '', estado: '' });
                    setPageNumber(0); // reinicia la paginación
                  }}
                >
                  Limpiar filtros
                </Button>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>

        <Col md={6} className="text-end">
          <Form.Group as={Row} className="align-items-center gx-2 mb-0">
            <Form.Label column xs="auto" className="mb-0 me-1">Mostrar:</Form.Label>
            <Col>
              <Form.Select size="sm" value={pageSize} onChange={handlePageSizeChange} disabled={displayOverallLoading}>
                {[10, 25, 50, 100].map(size => <option key={size} value={size}>{size}</option>)}
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>
      </Row>


      <Card className="table-card-wrapper mt-3">
        {isLoadingList && data && data.length > 0 && (
          <div className="loadingOverlay">
            <Spinner animation="border" variant="primary" /> <span className="ms-2">Actualizando...</span>
          </div>
        )}
        <Card.Body>
          <DataTable
            columns={columnsConfig}
            data={data || []}
            rowKeyField="id"
            currentSortConfig={sortConfig}
            onSort={handleSort}
            isLoading={displayOverallLoading}
            emptyDataMessage="No se encontraron reportes."
            emptyDataIcon={<FaFileAlt size={48} />}
          />
        </Card.Body>
      </Card>

      {paginationInfo?.totalPages > 1 && (
        <Row className="paginationRow">
          <Col className="d-flex justify-content-center">
            <ReusablePagination paginationInfo={paginationInfo} onPageChange={handlePageChange} isLoading={displayOverallLoading} />
          </Col>
        </Row>
      )}

      {paginationInfo?.totalElements > 0 && (
        <Row className="paginationInfo">
          <Col className="text-center text-muted">
            <small>
              Mostrando {data?.length || 0} de {paginationInfo.totalElements} reportes.
              Página {paginationInfo.number + 1} de {paginationInfo.totalPages}.
            </small>
          </Col>
        </Row>
      )}

      {isModalOpen && (
        <GenericFormModal
          key={formData.reportesTipoId || 'default'}
          show={isModalOpen}
          onHide={handleCloseModal}
          title="Agregar Reporte"
          initialData={formData}
          fieldsConfig={formSchema}
          onSave={handleSave}
          isSubmitting={isSubmitting}
          submitError={submitError}
          saveButtonText="Agregar"
          savingButtonText="Agregando..."
          getDerivedFields={getDerivedFields}
          onChange={handleChange}
        />

      )}
    </div>
  );
};

export default ReportesPage;
