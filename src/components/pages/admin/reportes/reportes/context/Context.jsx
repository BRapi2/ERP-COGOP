import React, { createContext, useContext } from 'react';
import { dataService } from '../api/Service';
import useData from '../../../../../setting/useData';

const DataContext = createContext(null);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext debe usarse dentro de un DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const logic = useData(dataService); 
    return (
        <DataContext.Provider value={logic}>
            {children}
        </DataContext.Provider>
    );
};