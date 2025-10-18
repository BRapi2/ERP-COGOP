import React from 'react';
import { ComposedChart, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Row, Button, Col, Card } from 'react-bootstrap';
import { FiUsers, FiPackage, FiDollarSign, FiDownload } from 'react-icons/fi';
import FloatingChatButton from './chat/FloatingChatButton';

import styles from './Dashboard.module.css';

function Dashboard() {

  const currentUser = { name: localStorage.getItem('email') };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const summaryData = [
    { title: 'Total Usuarios', value: '2,500', icon: <FiUsers size={32} />, color: 'primary', trend: '+5.4%', trendDirection: 'up', comparison: 'desde el mes pasado' },
    { title: 'Reportes Enviados', value: '150', icon: <FiPackage size={32} />, color: 'warning', trend: '-2.1%', trendDirection: 'down', comparison: 'desde la semana pasada' },
    { title: 'Ingresos', value: '$12,345', icon: <FiDollarSign size={32} />, color: 'success', trend: '+12.8%', trendDirection: 'up', comparison: 'desde el mes pasado' },
    { title: 'Egresos', value: '$12,345', icon: <FiDollarSign size={32} />, color: 'danger', trend: '+3.2%', trendDirection: 'up', comparison: 'desde el mes pasado' },
  ];

  const data_iglesias = [{ name: 'Iglesia A', Reportes: 200 }, { name: 'Iglesia B', Reportes: 198 }, { name: 'Iglesia C', Reportes: 300 }, { name: 'Iglesia D', Reportes: 250 }, { name: 'Iglesia E', Reportes: 100 }, { name: 'Iglesia F', Reportes: 176 },];
  const eventos = [{ name: 'Evento 1', Asistentes: 290, Faltaron: 320, Objetivo: 400 }, { name: 'Evento 2', Asistentes: 320, Faltaron: 400, Objetivo: 450 }, { name: 'Evento 3', Asistentes: 450, Faltaron: 300, Objetivo: 420 }, { name: 'Evento 4', Asistentes: 380, Faltaron: 500, Objetivo: 500 }, { name: 'Evento 5', Asistentes: 520, Faltaron: 600, Objetivo: 550 }, { name: 'Evento 6', Asistentes: 600, Faltaron: 450, Objetivo: 580 },];
  const distritos = [{ name: 'Distrito 10', value: 100 }, { name: 'Distrito 4', value: 80 }, { name: 'Distrito 7', value: 65 }, { name: 'Distrito 3', value: 50 }, { name: 'Distrito 15', value: 20 },];
  const membresia = [{ name: 'Enero', "Nuevos Miembros": 400, "Miembros Excluidos": 240 }, { name: 'Febrero', "Nuevos Miembros": 300, "Miembros Excluidos": 439 }, { name: 'Marzo', "Nuevos Miembros": 280, "Miembros Excluidos": 680 }, { name: 'Abril', "Nuevos Miembros": 278, "Miembros Excluidos": 390 }, { name: 'Mayo', "Nuevos Miembros": 189, "Miembros Excluidos": 480 }, { name: 'Junio', "Nuevos Miembros": 239, "Miembros Excluidos": 380 },];

  const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1'];


  return (
    <div className="p-4" style={{ background: '#f8f9fa' }}>
      <div className={`${styles.headerContainer} mb-2`}>
        <div>
          <h2 className={styles.headerGreeting}>{`${getGreeting()}, ${currentUser.name}`}</h2>
          <p className={styles.headerSubtitle}>Aquí tienes el resumen del sistema para hoy.</p>
        </div>
        <div className={styles.dateDisplay}>
          {today}
        </div>
      </div>
      <Row>
        {summaryData.map((item, index) => (
          <Col xs={12} sm={6} lg={3} key={index} className="mb-4">
            <Card className={`${styles.kpiCard} ${styles['bg_' + item.color]} shadow`}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className={styles.kpiTitle}>{item.title}</h5>
                    <div className={styles.kpiValue}>{item.value}</div>
                  </div>
                  <div className={styles.kpiIcon}>
                    {item.icon}
                  </div>
                </div>
                <div className={`${styles.kpiTrend} mt-2 ${item.trendDirection === 'up' ? styles.trendUp : styles.trendDown}`}>
                  <span>{item.trend}</span>
                  <span className="fw-light">{item.comparison}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col xs={12} lg={6} className="mb-4">
          <Card className={styles.contentCard}>
            <Card.Header className={styles.cardHeader}>Iglesias con mayor Reportes</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data_iglesias} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="Reportes" fill="#3c8cff" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={6} className="mb-4">
          <Card className={styles.contentCard}>
            <Card.Header className={styles.cardHeader}>Eventos de la Iglesia</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={eventos} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" scale="band" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }} />
                  <Legend />
                  <Area type="monotone" dataKey="Asistentes" fill="#d4edda" stroke="#198754" />
                  <Bar dataKey="Faltaron" barSize={20} fill="#6c757d" />
                  <Line type="monotone" dataKey="Objetivo" stroke="#ff7300" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12} lg={5} className="mb-4">
          <Card className={styles.contentCard}>
            <Card.Header className={styles.cardHeader}>Distritos con Mayor número de Iglesias</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={distritos} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" nameKey="name">
                    {distritos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={7} className="mb-4">
          <Card className={styles.contentCard}>
            <Card.Header className={styles.cardHeader}>Membresía General</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={membresia} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Nuevos Miembros" stackId="1" stroke="#3c8cff" fill="#dbe9ff" />
                  <Area type="monotone" dataKey="Miembros Excluidos" stackId="1" stroke="#dc3545" fill="#f8d7da" />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FloatingChatButton />
    </div>
  );
}

export default Dashboard;