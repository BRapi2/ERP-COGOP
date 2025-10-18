import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { FilterProvider } from './FilterContext';

export const AppProviders = ({ children }) => {
  return (
<BrowserRouter> 
    <AuthProvider>   
      <FilterProvider>
        {children}
      </FilterProvider>
    </AuthProvider>
</BrowserRouter>
  );
};