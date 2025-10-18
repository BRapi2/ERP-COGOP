import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Spinner, OverlayTrigger, Tooltip, Button, Nav, Navbar, Container, Form, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FiLogOut, FiMenu, FiBell, FiUser, FiSearch, FiArrowUpRight, FiX } from 'react-icons/fi';
import { useAuth } from '../../AuthContext';
import { useFilters } from '../../FilterContext';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';
import SearchResults from './SearchResults';

function MainLayout() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading: authIsLoading } = useAuth();
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, mesesDelAnio, aniosDisponibles } = useFilters();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (!authIsLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, authIsLoading, navigate]);

  if (authIsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Verificando autenticación...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return null;
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Nuevas notificaciones recibidas!');
      setNotificationCount(7);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      // --- Aquí llamarías a tu API real: fetch(`/api/search?q=${searchTerm}`) ---
      // Por ahora, simulamos la respuesta:
      const mockResults = {
        productos: [{ id: 1, name: 'Libro de Liderazgo "El Desafío"' }],
        eventos: [{ id: 1, name: `Evento sobre ${searchTerm}` }],
      };
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);
  const handleClearSearch = () => setSearchTerm('');

  return (
    <div className={styles.mainLayout}>
      <Navbar expand="lg" fixed="top" className={styles.navbar}>
        <Container fluid>
          <Button
            variant="outline-light"
            onClick={toggleSidebar}
            className="d-lg-none me-2"
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </Button>

          <Navbar.Brand as={Link} to="/general/dashboard" className={styles.navbarBrand}>
            COGOP
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" className={`${styles.navbarToggler} d-none`}>
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">



              {authIsLoading ? (
                <div className={styles.defaultKpi}>
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    as="span"
                    className="me-2"
                  />
                  <span>Verificando...</span>
                </div>

              ) : user && user.rol && user.rol === 1 ? (

                <div
                  className={styles.globalSearchContainer}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)} // Timeout para permitir el clic en los resultados
                >
                  <Form className={styles.globalSearchForm}>
                    <Form.Control
                      type="search"
                      placeholder="Buscar en todo el sistema..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && <FiX className={styles.globalSearchClear} onClick={handleClearSearch} />}
                  </Form>

                  {/* 5. Renderiza los resultados si el buscador está activo */}
                  {isSearchFocused && searchTerm && (
                    <SearchResults results={searchResults} isLoading={isSearching} />
                  )}
                </div>
              ) : user && user.rol && user.rol === 5 ? (
                <></>
              ) : (
                user && (
                  <div
                    className={styles.globalSearchContainer}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)} // Timeout para permitir el clic en los resultados
                  >
                    <Form className={styles.globalSearchForm}>
                      <Form.Control
                        type="search"
                        placeholder="Buscar en todo el sistema..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && <FiX className={styles.globalSearchClear} onClick={handleClearSearch} />}
                    </Form>

                    {/* 5. Renderiza los resultados si el buscador está activo */}
                    {isSearchFocused && searchTerm && (
                      <SearchResults results={searchResults} isLoading={isSearching} />
                    )}
                  </div>
                )
              )
              }
            </Nav>
            <Nav className="align-items-center">
              {
                authIsLoading ? (
                  <div className={styles.periodSelector}>
                    <Spinner animation="border" size="sm" />
                  </div>
                ) : user && user.rol && user.rol === 1 ? (
                  <div className={styles.globalKpi}>
                    <div className={styles.globalKpi}>
                      <span className={styles.kpiLabel}>Crecimiento Total:</span>
                      <span className={styles.kpiValue}>
                        +8.2%
                        <FiArrowUpRight size={18} className={styles.kpiIconUp} />
                      </span>
                    </div>
                  </div>
                ) : user && user.rol && user.rol === 5 ? (
                  // --- COMPONENTE DE PERÍODO REDISEÑADO ---
                  <div className={styles.periodSelector}>
                    <DropdownButton
                      as={ButtonGroup}
                      id="dropdown-period-selector"
                      // --- CAMBIO CLAVE AQUÍ ---
                      title={`${mesesDelAnio.find(m => m.id === selectedMonth)?.name || ''} ${aniosDisponibles.find(a => a.id === selectedYear)?.name || ''}`}
                      variant="outline-light"
                      className={styles.periodDropdown}
                    >
                      <div className={styles.dropdownMenuContent}>
                        <div className={styles.dropdownSection}>
                          <div className={styles.dropdownHeader}>MES</div>
                          <div className={styles.monthGrid}>
                            {mesesDelAnio.map((mes) => (
                              <Dropdown.Item
                                key={mes.id}
                                eventKey={mes.id}
                                active={selectedMonth === mes.id}
                                onClick={() => setSelectedMonth(mes.id)}
                              >
                                {mes.name.substring(0, 3)}
                              </Dropdown.Item>
                            ))}
                          </div>
                        </div>
                        <div className={styles.dropdownSection}>
                          <div className={styles.dropdownHeader}>AÑO</div>
                          <div className={styles.yearGrid}>
                            {aniosDisponibles.map((anio) => (
                              <Dropdown.Item
                                key={anio.id}
                                eventKey={anio.id}
                                active={selectedYear === anio.id}
                                onClick={() => setSelectedYear(anio.id)}
                              >
                                {anio.name}
                              </Dropdown.Item>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DropdownButton>
                  </div>
                ) : (
                  user && (
                    <div className={styles.defaultKpi}>
                      <span>Bienvenido, {user.username}</span>
                    </div>
                  )
                )
              }
              <div className={styles.iconWrapper}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-bandeja">Bandeja de Entrada</Tooltip>}
                >
                  <Nav.Link as={Link} to="/general/bandeja" className={styles.iconButton}>
                    <FiBell size={20} />
                  </Nav.Link>
                </OverlayTrigger>

                {notificationCount > 0 && (
                  <span className={styles.notificationBadge}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </div>
              <div className={styles.iconWrapper}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-perfil">Mi Perfil</Tooltip>}
                >
                  <Nav.Link as={Link} to="/general/perfil" className={styles.iconButton}>
                    <FiUser size={20} />
                  </Nav.Link>
                </OverlayTrigger>
              </div>

              <div className={styles.navSeparator}></div>

              <Button variant="outline-light" onClick={handleLogout} className={styles.logoutButton}>
                <FiLogOut /> Cerrar Sesión
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={styles.mainWrapper}>
        <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
          <Sidebar onLinkClick={() => setSidebarOpen(false)} />
        </div>
        <main className={styles.contentArea}>
          <div className={styles.contentInner}>
            <Suspense fallback={
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5rem' }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }></Suspense>

            <Outlet />
          </div>
        </main>
      </div>
      <footer className={styles.footer}>
        <Container>
          <p>&copy; {new Date().getFullYear()} Mi App COGOP. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  );
}
export default MainLayout;
