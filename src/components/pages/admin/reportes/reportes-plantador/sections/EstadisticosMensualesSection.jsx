/* eslint-disable no-unused-vars */
import React, { useImperativeHandle } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormSectionCard from '../../../FormSectionCard';

const EstadisticosMensualesSection = React.forwardRef(({ reporte, catalogos }, ref) => {

    console.log("DATOS DESDE ESTADÍSTICOS MENSUALES:", reporte);

    // Exponer los datos de esta sección
    useImperativeHandle(ref, () => ({
        getEstadisticosMensuales: () => {
            const getValor = id => document.getElementById(id)?.value || '';
            return {
                nro_nuevos_contactos: parseInt(getValor("nroNuevosContactos")) || null,
                nro_nuevos_gdc: parseInt(getValor("nroNuevosGdc")) || null,
                nro_nuevas_conversiones: parseInt(getValor("nroNuevasConversiones")) || null,
                nro_consolidados: parseInt(getValor("nroConsolidados")) || null,
                nro_discipulados: parseInt(getValor("nroDiscipulados")) || null,
                nro_bautizados_agua: parseInt(getValor("nroBautizadosAgua")) || null,
                nro_nuevas_personas_gdc: parseInt(getValor("nroNuevasPersonasGdc")) || null,
                nro_nuevos_lideres_gdc: parseInt(getValor("nroNuevosLideresGdc")) || null,
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

    return (
        <FormSectionCard title="DATOS ESTADÍSTICOS MENSUALES">
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("nroNuevosContactos", "Nuevos contactos", reporte?.extra?.nro_nuevos_contactos)}
                    </Col>
                    <Col md={6}>
                        {renderNumberInput("nroNuevosGdc", "Nuevos G.D.C.", reporte?.extra?.nro_nuevos_gdc)}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("nroNuevasConversiones", "Nuevas conversiones", reporte?.extra?.nro_nuevas_conversiones)}
                    </Col>
                    <Col md={6}>
                        {renderNumberInput("nroConsolidados", "N° Consolidando", reporte?.extra?.nro_consolidados)}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("nroDiscipulados", "N° discipulado", reporte?.extra?.nro_discipulados)}
                    </Col>
                    <Col md={6}>
                        {renderNumberInput("nroBautizadosAgua", "Bautizados en Agua", reporte?.extra?.nro_bautizados_agua)}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        {renderNumberInput("nroNuevasPersonasGdc", "Nuevas personas en los G.D.C", reporte?.extra?.nro_nuevas_personas_gdc)}
                    </Col>
                    <Col md={6}>
                        {renderNumberInput("nroNuevosLideresGdc", "Nuevos líderes con G.D.C", reporte?.extra?.nro_nuevos_lideres_gdc)}
                    </Col>
                </Row>
            </Form>
        </FormSectionCard>
    );
});

export default EstadisticosMensualesSection;
