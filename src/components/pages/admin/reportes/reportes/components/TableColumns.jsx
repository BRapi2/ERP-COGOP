import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const getColumnsConfig = ({ onEdit, onDelete, isLoading }) => [
  {
    key: 'tipoReporte.name',
    header: 'Tipo de Reporte',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'tipoPeriodo.name',
    header: 'Tipo de Periodo',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'periodo.name',
    header: 'Periodo',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'year',
    header: 'Año',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'nombres',
    header: 'Nombres',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'apellidos',
    header: 'Apellidos',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'email',
    header: 'Email',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'telefono',
    header: 'Teléfono',
    sortable: false,
    textAlign: 'center'
  },
  {
    key: 'direccion',
    header: 'Dirección',
    sortable: false,
    textAlign: 'center'
  },
  {
    name: 'reportesEstado',
    label: 'Estado',
    render: (value) => {
      if (!value) return null;

      const estado = value?.nombre;
      const id = value?.id;

      const colorMap = {
        1: 'secondary',
        2: 'primary',
        3: 'warning',
        4: 'success',
        5: 'danger',
      };

      const color = colorMap[id] || 'dark';

      return (
        `<span class="btn btn-sm btn-${color}" disabled>${estado}</span>`
      );
    }
  },
  {
    key: 'actions',
    header: 'Acciones',
    textAlign: 'center',
    render: (item) => (
      <div>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onEdit(item)}
          disabled={isLoading}
          title="Editar"
          className="me-2"
        >
          <FaEdit />
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(item.id)}
          disabled={isLoading}
          title="Eliminar"
        >
          <FaTrash />
        </Button>
      </div>
    )
  }
];
