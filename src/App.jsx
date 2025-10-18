// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoutes from './routes/AdminRoutes';
import NotFoundRoute from './routes/NotFoundRoutes';
import PublicRoute from './PublicRoute';
import SecretarioRoutes from "./routes/SecretarioRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route path="secretario/*" element={<SecretarioRoutes />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}

export default App;
