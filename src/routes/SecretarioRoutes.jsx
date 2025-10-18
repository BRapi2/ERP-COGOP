import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = React.lazy(() => import('../components/pages/admin/Dashboard'));
const ReportesPage = React.lazy(() => import('../components/pages/admin/reportes/reportes/pages/ReportesPage'));
const ReportesPlantadorFormPage = React.lazy(() => import('../components/pages/admin/reportes/reportes-plantador/ReportesPlantadorFormPage'));
const SecretarioRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />

      <Route path="reportes" element={<ReportesPage />} />
      <Route path="reportes-plantador/update/:id" element={<ReportesPlantadorFormPage />} />
    </Routes>
  );
};

export default SecretarioRoutes;
