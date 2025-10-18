// src/components/marketplace/EventCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import styles from '../pages/Marketplace.module.css';

function EventCard({ event }) {
  return (
    <Card className={`${styles.itemCard} h-100`}>
      <Card.Img variant="top" src={event.imageUrl} alt={event.name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="small">{event.description}</Card.Text>
        <div className="mt-auto">
          <p className="text-muted mb-1 small"><FiCalendar className="me-2" />{event.date}</p>
          <p className="text-muted mb-3 small"><FiMapPin className="me-2" />{event.location}</p>
          <Button variant="outline-success" className="w-100">Inscribirse Ahora</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
export default EventCard;