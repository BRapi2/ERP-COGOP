/* eslint-disable no-unused-vars */
import React, { useImperativeHandle } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormSectionCard from '../../../FormSectionCard';

const EstadisticaTotalSection = React.forwardRef(({ reporte, catalogos }, ref) => {

    console.log("DATOS DESDE ESTADÍSTICA TOTAL:", reporte);

    // Exponer los datos de esta sección
    useImperativeHandle(ref, () => ({
        getEstadisticaTotal: () => {
            const getValor = id => document.getElementById(id)?.value || '';
            return {
                nro_creyentes: parseInt(getValor("nroCreyentes")) || null,
                nro_miembros: parseInt(getValor("nroMiembros")) || null,
                nro_lideres_gdc: parseInt(getValor("nroLideresGdc")) || null,
                total_personas_gdc: parseInt(getValor("totalPersonasGdc")) || null,
                total_personas_discipulados: parseInt(getValor("totalPersonasDiscipulados")) || null,
                visita_pastor_iglesia_central: getValor("visitaPastorIglesiaCentral"),
                visita_supervisor_distrital: getValor("visitaSupervisorDistrital"),
            };
        }
    }));

    const renderNumberInput = (id, label, defaultVal = '') => (
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="number"
                className="form-control-sm"
                placeholder="Ingrese un número"
                defaultValue={defaultVal ?? ''}
            />
        </Form.Group>
    );

    const renderYesNoSelect = (id, label, defaultVal = '') => (
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Select className="form-select-sm" id={id} defaultValue={defaultVal ?? ''}>
                <option value="">Seleccione</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </Form.Select>
        </Form.Group>
    );

    return (
        <FormSectionCard title="ESTADÍSTICA TOTAL">
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("nroCreyentes", "Número de Creyentes", reporte?.extra?.nro_creyentes)}
                    </Col>
                    <Col md={6}>
                        {renderNumberInput("nroMiembros", "Número de Miembros", reporte?.extra?.nro_miembros)}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("nroLideresGdc", "Número de Líderes de G.D.C.", reporte?.extra?.nro_lideres_gdc)}
                    </Col>
                    <Col md={6}>
                        {renderNumberInput("totalPersonasGdc", "Total de Personas en G.D.C.", reporte?.extra?.total_personas_gdc)}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("totalPersonasDiscipulados", "Total de personas discipulados", reporte?.extra?.total_personas_discipulados)}
                    </Col>
                    <Col md={6}>
                        {renderYesNoSelect("visitaPastorIglesiaCentral", "¿Le visitó el pastor de la iglesia central?", reporte?.extra?.visita_pastor_iglesia_central)}
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        {renderYesNoSelect("visitaSupervisorDistrital", "¿Contó con la visita del Supervisor de Distrito?", reporte?.extra?.visita_supervisor_distrital)}
                    </Col>
                </Row>
            </Form>
        </FormSectionCard>
    );
});

export default EstadisticaTotalSection;
