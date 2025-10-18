// src/components/marketplace/TrainingCard.js
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FiCalendar } from 'react-icons/fi';
import styles from '../pages/Marketplace.module.css';

function TrainingCard({ training }) {
  return (
    <Card className={`${styles.trainingCard} h-100`}>
      <Card.Body className="d-flex flex-column">
        <div>
          <Badge pill bg="light" text="dark" className="mb-2">{training.category}</Badge>
          <Card.Title className="h6">{training.name}</Card.Title>
        </div>
        <div className="mt-auto">
          <p className="text-muted small mb-2"><FiCalendar className="me-2" />{training.date}</p>
          <Button variant="success" size="sm" className="w-100">Ver Información</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default TrainingCard;