import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import styles from './ReusablePagination.module.css'; // Asegúrate que la ruta es correcta

/**
 * Componente de paginación reutilizable con estilos mejorados.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.paginationInfo - Objeto con la información de paginación (number, totalPages, etc.).
 * @param {function} props.onPageChange - Función callback que se llama cuando se selecciona una nueva página (devuelve el nuevo número de página 0-indexado).
 * @param {boolean} props.isLoading - Indica si los datos se están cargando, para deshabilitar los botones.
 * @param {number} [props.maxPagesToShow=5] - Máximo de botones de números de página a mostrar.
 * @param {'sm' | 'md' | 'lg'} [props.size='sm'] - Tamaño de la paginación ('sm', 'md', 'lg').
 */
function ReusablePagination({ 
  paginationInfo, 
  onPageChange, 
  isLoading, 
  maxPagesToShow = 5,
  size = '' // Prop para controlar el tamaño, por defecto 'sm'
}) {
  if (!paginationInfo || paginationInfo.totalPages <= 1) {
    return null; // No renderizar nada si no hay paginación necesaria o solo una página
  }

  const items = [];
  const currentPageZeroIndexed = paginationInfo.number;
  const totalPages = paginationInfo.totalPages;

  const handlePageClick = (newPageNumber) => {
    // Prevenir cambio de página si está cargando o si el número de página es inválido
    if (isLoading || newPageNumber < 0 || newPageNumber >= totalPages) {
      return;
    }
    onPageChange(newPageNumber);
  };

  // Botón "Primera Página"
  items.push(
    <Pagination.First
      key="first"
      onClick={() => handlePageClick(0)}
      disabled={isLoading || currentPageZeroIndexed === 0}
      className={`${styles.pageItem} ${styles.controlButton}`} // Aplicar estilos
    />
  );

  // Botón "Página Anterior"
  items.push(
    <Pagination.Prev
      key="prev"
      onClick={() => handlePageClick(currentPageZeroIndexed - 1)}
      disabled={isLoading || currentPageZeroIndexed === 0}
      className={`${styles.pageItem} ${styles.controlButton}`} // Aplicar estilos
    />
  );

  // Lógica para determinar qué números de página mostrar
  let startPage, endPage;
  if (totalPages <= maxPagesToShow) {
    // Mostrar todas las páginas si son pocas
    startPage = 0;
    endPage = totalPages - 1;
  } else {
    // Lógica para mostrar un subconjunto de páginas con elipsis
    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

    if (currentPageZeroIndexed <= maxPagesBeforeCurrent) {
      // Cerca del inicio
      startPage = 0;
      endPage = maxPagesToShow - 1;
    } else if (currentPageZeroIndexed + maxPagesAfterCurrent >= totalPages - 1) {
      // Cerca del final
      startPage = totalPages - maxPagesToShow;
      endPage = totalPages - 1;
    } else {
      // En el medio
      startPage = currentPageZeroIndexed - maxPagesBeforeCurrent;
      endPage = currentPageZeroIndexed + maxPagesAfterCurrent;
    }
  }

  // Mostrar el primer botón de página si no está en el rango principal
  if (startPage > 0) {
    items.push(
      <Pagination.Item
        key={0} // Key para la primera página
        active={0 === currentPageZeroIndexed}
        onClick={() => handlePageClick(0)}
        disabled={isLoading}
        className={styles.pageItem} // Aplicar estilos
      >
        1
      </Pagination.Item>
    );
    // Mostrar elipsis si hay un salto entre la primera página y el inicio del rango
    if (startPage > 1) { // Solo mostrar elipsis si hay al menos una página entre '1' y 'startPage'
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled className={`${styles.pageItem} ${styles.ellipsis}`} />);
    }
  }

  // Botones de números de página
  for (let number = startPage; number <= endPage; number++) {
    if (number >= 0 && number < totalPages) { // Asegurar que el número esté en el rango válido
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPageZeroIndexed}
          onClick={() => handlePageClick(number)}
          disabled={isLoading}
          className={styles.pageItem} // Aplicar estilos
        >
          {number + 1} {/* Mostrar número de página 1-indexado al usuario */}
        </Pagination.Item>
      );
    }
  }

  // Mostrar el último botón de página si no está en el rango principal
  if (endPage < totalPages - 1) {
    // Mostrar elipsis si hay un salto entre el fin del rango y la última página
    if (endPage < totalPages - 2) { // Solo mostrar elipsis si hay al menos una página entre 'endPage' y 'totalPages - 1'
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled className={`${styles.pageItem} ${styles.ellipsis}`} />);
    }
    items.push(
      <Pagination.Item
        key={totalPages - 1} // Key para la última página
        active={totalPages - 1 === currentPageZeroIndexed}
        onClick={() => handlePageClick(totalPages - 1)}
        disabled={isLoading}
        className={styles.pageItem} // Aplicar estilos
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  // Botón "Página Siguiente"
  items.push(
    <Pagination.Next
      key="next"
      onClick={() => handlePageClick(currentPageZeroIndexed + 1)}
      disabled={isLoading || currentPageZeroIndexed >= totalPages - 1}
      className={`${styles.pageItem} ${styles.controlButton}`} // Aplicar estilos
    />
  );

  // Botón "Última Página"
  items.push(
    <Pagination.Last
      key="last"
      onClick={() => handlePageClick(totalPages - 1)}
      disabled={isLoading || currentPageZeroIndexed >= totalPages - 1}
      className={`${styles.pageItem} ${styles.controlButton}`} // Aplicar estilos
    />
  );

  return (
    // Aplicar la clase al contenedor principal de Pagination
    <Pagination size={size} className={`${styles.paginationContainer} mb-0`}>
      {items}
    </Pagination>
  );
}

export default ReusablePagination;
