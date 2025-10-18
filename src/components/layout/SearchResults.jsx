import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainLayout.module.css'; 

const categoryNames = {
  productos: 'Productos',
  eventos: 'Eventos',
  capacitaciones: 'Capacitaciones',
  usuarios: 'Usuarios',
};

function SearchResults({ results, isLoading }) {
  if (isLoading) {
    return <div className={styles.searchResults}><p className="text-center p-3">Buscando...</p></div>;
  }

  if (!results || Object.keys(results).length === 0) {
    return <div className={styles.searchResults}><p className="text-center p-3">No se encontraron resultados.</p></div>;
  }

  return (
    <div className={styles.searchResults}>
      {Object.entries(results).map(([category, items]) => (
        <div key={category} className={styles.searchCategory}>
          <h6 className={styles.searchCategoryTitle}>{categoryNames[category] || category}</h6>
          <ul className={styles.searchResultList}>
            {items.map(item => (
              <li key={`${category}-${item.id}`}>
                <Link to={`/admin/marketplace`} className={styles.searchResultItem}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;