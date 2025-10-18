import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import fondo from './fondo.jpg';
import { getApiUrl } from '../../../api';

const LoginPage = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage("El nombre de usuario y la contraseña son requeridos.");
      return;
    }

    const adminEndpoint = `https://backapicogop-dmewg9hcd0amezde.canadacentral-01.azurewebsites.net/api/v1/login`;
    const userEndpoint = getApiUrl('login/login');
    const specialDomain = 'cogopcontabilidad.com';

    let targetEndpoint = userEndpoint;
    let body = { username, password };

    if (username.includes('@') && username.toLowerCase().endsWith(`@${specialDomain}`)) {
      targetEndpoint = adminEndpoint;
      body = { correo: username, password };
    }

    setIsLoading(true);
    try {
      const response = await fetch(targetEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok && (result.status === 'SUCCESS' || result.status === 'success') &&
        (result.data?.token || result.data?.accessToken)) {

        console.log("✅ Login exitoso. Datos recibidos del backend:", result.data);


        const userData = {
          token: result.data.token || result.data.accessToken,
          username,
          rol: result.data.rol
        };

        // 🔹 Depuración de rol
        console.log("🔹 Rol recibido:", result.data.rol);
        console.log("🔹 Rol ID:", result.data.rol?.id);


        const rolId = typeof result.data.rol === 'number' ? result.data.rol : result.data.rol?.id;

        let redirectPath = '/';
        switch (rolId) {
          case 1: redirectPath = '/admin/dashboard'; break;
          case 2: redirectPath = '/secretario/dashboard'; break;
          case 3: redirectPath = '/tesorero/dashboard'; break;
          case 4: redirectPath = '/pastor/dashboard'; break;
          case 5: redirectPath = '/contabilidad/dashboard'; break;
        }

        console.log("🔹 Ruta calculada para redirección:", redirectPath);


        login(userData, redirectPath); // 🔹 Redirección inmediata

        localStorage.setItem('menu', JSON.stringify(result.data.menu));
        localStorage.setItem('iglesia', JSON.stringify(result.data.iglesia));
      } else {
        setErrorMessage(result.error_message || "Credenciales incorrectas o error en el servidor.");
      }
    } catch (error) {
      console.error("Error de red o fetch:", error);
      setErrorMessage("Error de conexión. Por favor, intente más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0 min-vh-100">
        <Col md={6} lg={7} className="d-none d-md-block p-0">
          <img src={fondo} alt="Login background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Col>

        <Col xs={12} md={6} lg={5} className="d-flex flex-column justify-content-center align-items-center bg-light p-4 p-md-5">
          <Card className="shadow-lg border-0 rounded-3 w-100" style={{ maxWidth: '480px' }}>
            <Card.Body className="p-4 p-sm-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-0">Admin Login</h2>
                <p className="text-muted">Accede a tu panel de control</p>
              </div>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formUsername">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    size="lg"
                    disabled={isLoading}
                    isInvalid={!!errorMessage}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    size="lg"
                    disabled={isLoading}
                    isInvalid={!!errorMessage}
                  />
                </Form.Group>
                <Form.Group className="mb-4 d-flex justify-content-between align-items-center">
                  <Form.Check type="checkbox" label="Recordarme" id="rememberMeCheckbox" />
                  <Link to="/recuperar-password" className="small text-decoration-none">¿Olvidaste tu contraseña?</Link>
                </Form.Group>
                {errorMessage && <Alert variant="danger" className="text-center">{errorMessage}</Alert>}
                <div className="d-grid mt-4">
                  <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Ingresando...</span>
                      </>
                    ) : 'Ingresar'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;