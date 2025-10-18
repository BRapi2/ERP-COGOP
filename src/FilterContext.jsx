// FilterContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import { useAuth } from './AuthContext'; // 🔹 Importa AuthContext

const mesesDelAnio = [
  { id: 0, name: "Inicio" }, { id: 1, name: "Enero" }, { id: 2, name: "Febrero" },
  { id: 3, name: "Marzo" }, { id: 4, name: "Abril" }, { id: 5, name: "Mayo" },
  { id: 6, name: "Junio" }, { id: 7, name: "Julio" }, { id: 8, name: "Agosto" },
  { id: 9, name: "Septiembre" }, { id: 10, name: "Octubre" },
  { id: 11, name: "Noviembre" }, { id: 12, name: "Diciembre" }
];

const aniosDisponibles = [];
for (let anio = 2024, contadorId = 1; anio <= 2045; anio++, contadorId++) {
  aniosDisponibles.push({ id: contadorId, name: anio.toString() });
}

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const { token } = useAuth(); // 🔹 Usamos el token directo de AuthContext
  const [config, setConfig] = useState(null);
  const [iglesia, setIglesia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const anioActual = new Date().getFullYear();
  const idMesActual = new Date().getMonth() + 1;
  const idAnioActual = aniosDisponibles.find(a => a.name === anioActual.toString())?.id || 1;

  const [selectedMonth, setSelectedMonth] = useState(idMesActual);
  const [selectedYear, setSelectedYear] = useState(idAnioActual);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("ESTAMOS EN FILTER CONTEXT");

    const fetchSettings = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("CARGANDO LA API lista-settings");
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'CustomToken': token };
        const response = await fetch(getApiUrl('voucher/lista-settings'), { method: 'GET', headers });

        if (response.ok) {
          const data = await response.json();
          setConfig(data.data);
          setIglesia(data.data.iglesia);
        } else {
          console.error("Token inválido o sesión expirada.");
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.log("ERROR DE LA API SETTING");
        console.log(error);
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [token, navigate]); // 🔹 Dispara cuando token cambia

  useEffect(() => {
    console.log("ESTAMOS EN FILTER CONTEXT 2");
    if (!isLoading && !token) {
      if (location.pathname !== "/login" && location.pathname !== "/") {
        navigate('/login', { replace: true });
      }
    }
  }, [token, isLoading, navigate, location.pathname]);

  return (
    <FilterContext.Provider value={{
      selectedMonth,
      setSelectedMonth,
      selectedYear,
      setSelectedYear,
      mesesDelAnio,
      aniosDisponibles,
      config,
      isLoading,
      iglesia,
    }}>
      {!isLoading && children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters debe ser usado dentro de un FilterProvider');
  return context;
};
