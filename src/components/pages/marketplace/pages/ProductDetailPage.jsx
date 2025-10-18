import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Table, Breadcrumb, Card } from 'react-bootstrap';
import { FiShoppingCart, FiMinus, FiPlus, FiAward, FiBookOpen, FiTrendingUp, FiTarget, FiEdit, FiLink, FiStar, FiShield, FiGift } from 'react-icons/fi';
import styles from './ProductDetailPage.module.css';
import { productsData } from './mockData.js';


const iconMap = { FiAward, FiBookOpen, FiTrendingUp, FiTarget, FiEdit, FiLink, FiStar, FiShield, FiGift } 

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = productsData.find(p => p.id === parseInt(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
      const foundRelated = productsData.filter(p => foundProduct.relatedProductIds.includes(p.id));
      setRelatedProducts(foundRelated);
    }
  }, [productId]);
  
  if (!product) {
    return <Container className="text-center p-5"><h2>Producto no encontrado</h2></Container>;
  }

  const handleQuantityChange = (amount) => setQuantity(prev => Math.max(1, prev + amount));

  return (
    <div className={styles.pageBackground}>
      <Container className="py-4 py-md-5">
        
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/marketplace" }}>Marketplace</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Card className={styles.mainCard}>
          <Card.Body>
            <Row>
              {/* Columna de la Galería de Imágenes */}
              <Col md={6} className="mb-4 mb-md-0">
                <Image src={mainImage} alt={product.name} fluid className={styles.mainImage} />
                <div className={styles.thumbnailContainer}>
                  {product.images.map((img, index) => (
                    <Image key={index} src={img} thumbnail className={`${styles.thumbnail} ${mainImage === img ? styles.activeThumbnail : ''}`} onClick={() => setMainImage(img)} />
                  ))}
                </div>
              </Col>

              {/* Columna de Detalles y Compra */}
              <Col md={6}>
                <h1 className={styles.productTitle}>{product.name}</h1>
                <p className="text-muted fs-5 mb-4">{product.tagline}</p>
                <div className={styles.price}>{product.price}</div>
                
                <div className={styles.keyFeaturesSection}>
                  {product.keyFeatures.map(feature => {
                    const Icon = iconMap[feature.icon];
                    return (
                      <div key={feature.text} className={styles.keyFeature}>
                        <Icon className={styles.featureIcon} size={20} />
                        <span>{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className={styles.purchaseSection}>
                  <div className={styles.quantitySelector}>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(-1)}><FiMinus /></Button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(1)}><FiPlus /></Button>
                  </div>
                  <Button variant="primary" size="lg" className={styles.ctaButton}>
                    <FiShoppingCart className="me-2" /> Añadir al Carrito
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className={styles.detailsCard}>
          <Card.Body>
            <h2 className={styles.sectionTitle}>Descripción del Producto</h2>
            <p className={styles.descriptionText}>{product.description}</p>
          </Card.Body>
        </Card>

        <Card className={styles.detailsCard}>
          <Card.Body>
            <h2 className={styles.sectionTitle}>Detalles Técnicos</h2>
            <Table borderless responsive className={styles.detailsTable}>
              <tbody>
                {product.details.map(detail => (
                  <tr key={detail.label}>
                    <td className={styles.detailLabel}>{detail.label}</td>
                    <td>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
export default ProductDetailPage;