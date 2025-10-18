import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Dashboard = React.lazy(() => import('../components/pages/admin/Dashboard'));

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Dashboard />} />

            <Route index element={<Navigate to="dashboard" replace />} />
        </Routes>
    );
};

export default AdminRoutes;