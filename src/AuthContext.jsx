import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';

const AuthContext = createContext(null);

const rolesMap = {
    1: "Administrador",
    2: "Secretario",
    3: "Tesorero",
    4: "Pastor",
    5: "Contabilidad",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // 🔹 Al montar, validamos token si existe
    useEffect(() => {
        const validateAndFetchUser = async () => {
            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                setIsLoading(false);
                return;
            }

            try {
                const headers = { 'Content-Type': 'application/json', 'CustomToken': token };
                const response = await fetch(getApiUrl('user/listar-rol'), { method: 'POST', headers });

                if (response.ok) {
                    const userDataResponse = await response.json();
                    setUser(userDataResponse.data);
                    setIsAuthenticated(true);
                } else {
                    logout();
                }
            } catch (err) {
                console.error("Error validando token:", err);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        validateAndFetchUser();
    }, [token]);

    // 🔹 Mantener redirección a login si no está autenticado
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            if (location.pathname !== "/login" && location.pathname !== "/") {
                navigate('/login', { replace: true });
            }
        }
    }, [isAuthenticated, isLoading, navigate, location.pathname]);

    // 🔹 Login con redirección inmediata
    const login = (userData, redirectPath = null) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("email", userData.username);
        localStorage.setItem("pageSize", 50);
        setToken(userData.token);

        if (redirectPath) {
            console.log(`Redirigiendo a: ${redirectPath}`);
            navigate(redirectPath, { replace: true });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('pageSize');
        localStorage.removeItem('menu');
        localStorage.removeItem('iglesia');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout, rolesMap }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    return context;
};
