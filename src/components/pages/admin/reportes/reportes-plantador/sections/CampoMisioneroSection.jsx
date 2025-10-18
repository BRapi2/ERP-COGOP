/* eslint-disable no-unused-vars */
import React, { useImperativeHandle } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import FormSectionCard from '../../../FormSectionCard';

const CampoMisioneroSection = React.forwardRef(({ reporte, catalogos }, ref) => {

    console.log("DATOS DESDE CAMPO MISIONERO:", reporte);

    // Exponer los datos que se van a enviar al save
    useImperativeHandle(ref, () => ({
        getCampoMisionero: () => {
            const getValor = id => document.getElementById(id)?.value || '';
            return {
                direccion_completa: getValor("direccionCompleta"),
                fecha_proyectada_mision: getValor("fechaProyectadaMision") || null
            };
        }
    }));

    return (
        <FormSectionCard title="INFORMACIÓN PERSONAL DEL MISIONERO">
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="direccionCompleta">
                            <Form.Label>Dirección Completa del Campo Misionero</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control-sm"
                                placeholder="Ingrese la dirección completa"
                                defaultValue={reporte?.extra?.direccion_completa ?? ''}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="fechaProyectadaMision">
                            <Form.Label>FECHA PROYECTADA PARA SER UNA MISIÓN ORGANIZADA</Form.Label>
                            <Form.Control
                                type="date"
                                className="form-control-sm"
                                defaultValue={reporte?.extra?.fecha_proyectada_mision ?? ''}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </FormSectionCard>
    );
});

export default CampoMisioneroSection;
