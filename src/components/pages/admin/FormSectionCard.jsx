import React from 'react';
import { Card } from 'react-bootstrap';
import './FormSectionCard.css'; // Asegúrate de tener este archivo

const FormSectionCard = ({ title, children, action = null, className = '' }) => {
  return (
    <Card className={`mb-4 shadow rounded-4 border-0 ${className}`}>
      <Card.Header className="form-section-header d-flex justify-content-between align-items-center">
        <span className="form-section-title">{title}</span>
        {action && <div className="ms-2">{action}</div>}
      </Card.Header>
      <Card.Body className="bg-light-subtle px-4 py-4 rounded-bottom-4">
        {children}
      </Card.Body>
    </Card>
  );
};

export default FormSectionCard;
