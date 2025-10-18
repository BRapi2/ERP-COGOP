import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../pages/Marketplace.module.css';

function ProductCard({ product }) {
  return (
    <Link to={`/admin/productos/${product.id}`} className="text-decoration-none">
      <Card className={`${styles.itemCard} h-100`}>
        {product.badge && <Badge bg="danger" className={styles.productBadge}>{product.badge}</Badge>}
        <Card.Img variant="top" src={product.images ? product.images[0] : product.imageUrl} alt={product.name} />
        <Card.Body className="d-flex flex-column text-start">
          <Card.Title className="h6">{product.name}</Card.Title>
          <Card.Text className={`${styles.priceText} mt-auto`}>
            {product.price}
          </Card.Text>
          <Button variant="primary" className="mt-2 w-100 stretched-link" as="div">Ver Detalles</Button>
        </Card.Body>
      </Card>
    </Link>
  );
}
export default ProductCard;