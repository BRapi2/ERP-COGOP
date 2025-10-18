/* eslint-disable no-unused-vars */
import React, { useImperativeHandle } from 'react';
import { Form } from 'react-bootstrap';
import FormSectionCard from '../../../FormSectionCard';

const ComentarioSection = React.forwardRef(({ reporte }, ref) => {

    console.log("DATOS DESDE COMENTARIO:", reporte);

    // Exponer los datos de esta sección
    useImperativeHandle(ref, () => ({
        getComentario: () => {
            const valor = document.getElementById("comentario")?.value || '';
            return {
                comentario: valor
            };
        }
    }));

    return (
        <FormSectionCard title="COMENTARIO">
            <Form>
                <Form.Group controlId="comentario">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Ingrese su comentario aquí..."
                        defaultValue={reporte?.extra?.comentario ?? ''}
                    />
                </Form.Group>
            </Form>
        </FormSectionCard>
    );
});

export default ComentarioSection;
