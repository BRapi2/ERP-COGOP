import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import EventCard from '../components/EventCard';
import TrainingCard from '../components/TrainingCard';
import styles from './Marketplace.module.css';
import { productsData, eventsData, trainingsData } from './mockData';

function Marketplace() {
  const featuredProduct = productsData.find(p => p.isFeatured);
  const otherProducts = productsData.filter(p => !p.isFeatured);

  return (
    <Container fluid className={styles.marketplaceContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className="display-4">Centro de Recursos y Eventos</h1>
          <p className="lead">Todo lo que necesitas para crecer en tu misión, en un solo lugar.</p>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className={styles.sectionTitle}>Productos Destacados</h2>
        <Row className="mb-5 align-items-stretch">
          <Col md={12} lg={6} className="mb-4">
            <ProductCard product={featuredProduct} />
          </Col>
          <Col md={12} lg={6}>
            <Row>
              {otherProducts.map(product => (
                <Col key={product.id} md={6} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <h2 className={styles.sectionTitle}>Nuestros Próximos Eventos</h2>
        <Row className="mb-5">
          {eventsData.map(event => (
            <Col key={event.id} md={6} className="mb-4">
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
        
        <h2 className={styles.sectionTitle}>Desarrolla tus Habilidades</h2>
        <Row>
          {trainingsData.map(training => (
            <Col key={training.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <TrainingCard training={training} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Marketplace;