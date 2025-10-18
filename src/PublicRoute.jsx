import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Spinner } from 'react-bootstrap';

const PublicRoute = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (isAuthenticated) {
    // 🔹 Detectamos rol como número o como objeto
    const rolId = typeof user?.rol === 'number' ? user.rol : user?.rol?.id;

    let redirectPath = '/';
    switch (rolId) {
      case 1: redirectPath = '/admin/dashboard'; break;
      case 2: redirectPath = '/secretario/dashboard'; break;
      case 3: redirectPath = '/tesorero/dashboard'; break;
      case 4: redirectPath = '/pastor/dashboard'; break;
      case 5: redirectPath = '/contabilidad/dashboard'; break;
    }

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
