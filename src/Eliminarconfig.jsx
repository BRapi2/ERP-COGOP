import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getApiUrl } from '../api';
const AZURE_URL = 'https://backapicogop-dmewg9hcd0amezde.canadacentral-01.azurewebsites.net/api/v1/';
const ERP_URL = getApiUrl()+"/";
const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [apiUrl, setApiUrl] = useState(AZURE_URL);
    useEffect(() => {
        if (isAuthenticated) {
            const menu = localStorage.getItem("menu")
            if(menu){
            setApiUrl(ERP_URL);
            }else{
            setApiUrl(AZURE_URL);
            }
        } else {
            console.log("Usuario no autenticado");
        }
    }, [isAuthenticated]);

    const value = { apiUrl };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);