// src/components/common/DataTable.jsx (o la ruta que prefieras para componentes comunes)
import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'; // Para acciones si se definen como botones
import Spinner from 'react-bootstrap/Spinner'; // Para un estado de carga dentro de la tabla
import { FaSort, FaSortUp, FaSortDown, FaUsers } from 'react-icons/fa'; // Iconos para sort y no data

// Helper para obtener valores anidados de un objeto (ej. 'estado.nombre')
const getNestedValue = (obj, path) => {
  if (!path) return undefined;
  const keys = path.split('.');
  return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
};

// Componente SortableHeader (puede ser el mismo que ya tienes o adaptado)
const SortableHeader = ({ children, sortKey, currentSort, onSort, headerClassName }) => {
  const isSorted = currentSort.field === sortKey;
  const isAsc = isSorted && currentSort.direction === 'asc';
  const isDesc = isSorted && currentSort.direction === 'desc';
  
  let icon = <FaSort color="#adb5bd" size="0.8em" />;
  if (isAsc) icon = <FaSortUp color="#0d6efd" size="0.8em" />;
  else if (isDesc) icon = <FaSortDown color="#0d6efd" size="0.8em" />;

  return (
    <th 
      onClick={() => onSort(sortKey)} 
      className={`sortable-header ${headerClassName || ''}`} // Usa clase global y opcional de props
      style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
    >
      {children} <span className="sort-icon" style={{ marginLeft: '5px' }}>{icon}</span>
    </th>
  );
};

/**
 * Componente DataTable genérico y reutilizable.
 *
 * @param {object} props
 * @param {array} props.columns - Array de objetos de configuración de columna.
 * Cada objeto: { key: string, header: string, sortable?: boolean, render?: (item) => JSX, cellClassName?: string, headerClassName?: string, textAlign?: string }
 * @param {array} props.data - Array de objetos de datos a mostrar.
 * @param {string} props.rowKeyField - Nombre del campo en 'data' que es único para cada fila (ej. 'id').
 * @param {object} [props.currentSortConfig] - Configuración actual de ordenamiento { field, direction }.
 * @param {function} [props.onSort] - Función callback para manejar el ordenamiento.
 * @param {boolean} [props.isLoading] - Indica si los datos se están cargando.
 * @param {string} [props.tableClassName="professional-table"] - Clases para el componente Table.
 * @param {string} [props.emptyDataMessage="No se encontraron datos."] - Mensaje cuando no hay datos.
 * @param {JSX.Element} [props.emptyDataIcon=<FaUsers />] - Icono para cuando no hay datos.
 * @param {boolean} [props.striped=true] - Si la tabla debe tener filas alternas.
 * @param {boolean} [props.hover=true] - Si las filas deben tener efecto hover.
 * @param {boolean} [props.responsive=true] - Si la tabla debe ser responsive.
 * @param {'sm' | undefined} [props.size='sm'] - Tamaño de la tabla.
 */
function DataTable({
  columns = [],
  data = [],
  rowKeyField = "id", // Campo para la key de la fila, usualmente 'id'
  currentSortConfig = { field: '', direction: 'asc' },
  onSort = () => {},
  isLoading = false,
  tableClassName = "professional-table", // Clase global por defecto
  emptyDataMessage = "No se encontraron datos para mostrar.",
  emptyDataIcon = <FaUsers size={48} className="mb-3 text-muted" />,
  striped = true,
  hover = true,
  responsive = true,
  size = 'sm'
}) {

  // No renderizar la tabla si está cargando y no hay datos (el componente padre maneja el spinner principal)
  if (isLoading && data.length === 0) {
    return null; // O un spinner más pequeño si se prefiere un feedback dentro de la card
  }

  // Si no está cargando y no hay datos
  if (!isLoading && data.length === 0) {
    return (
      <div className="text-center text-muted mt-3 py-4"> {/* Usar una clase global o estilos en línea */}
        {React.cloneElement(emptyDataIcon, { className: `${emptyDataIcon.props.className || ''} mb-3` })}
        <h4>{emptyDataMessage.split('\n')[0]}</h4>
        {emptyDataMessage.includes('\n') && <p>{emptyDataMessage.split('\n').slice(1).join('\n')}</p>}
      </div>
    );
  }

  return (
    <Table striped={striped} hover={hover} responsive={responsive} className={`mt-0 ${tableClassName}`} size={size}>
      <thead>
        <tr>
          {columns.map((col) => 
            col.sortable ? (
              <SortableHeader
                key={col.key}
                sortKey={col.key}
                currentSort={currentSortConfig}
                onSort={onSort}
                headerClassName={col.headerClassName}
              >
                {col.header}
              </SortableHeader>
            ) : (
              <th key={col.key} className={col.headerClassName} style={{textAlign: col.textAlign || 'left'}}>
                {col.header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          if (!item) return null;
          const key = getNestedValue(item, rowKeyField) !== undefined ? getNestedValue(item, rowKeyField) : index;
          return (
            <tr key={key}>
              {columns.map((col) => (
                <td 
                    key={`${key}-${col.key}`} 
                    className={col.cellClassName}
                    style={{textAlign: col.textAlign || 'left', verticalAlign: 'middle'}}
                >
                  {col.render ? col.render(item, index) : (getNestedValue(item, col.key) ?? 'N/A')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default DataTable;
