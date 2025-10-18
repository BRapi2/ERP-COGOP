
export const productsData = [
  { 
    id: 1, 
    name: 'Libro de Liderazgo "El Desafío"',
    tagline: 'Una guía práctica para líderes del siglo XXI',
    price: '$19.99', 
    images: [
      'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200'
    ],
    isFeatured: true, 
    badge: 'Más Vendido',
    description: 'Este libro profundiza en las complejidades del liderazgo moderno, ofreciendo herramientas prácticas y estudios de caso para inspirar y equipar a la nueva generación de líderes. Una lectura esencial para cualquiera en una posición de influencia.',
    details: [
      { label: 'Autor', value: 'Dr. Samuel Rivas' },
      { label: 'Páginas', value: '280' },
      { label: 'Encuadernación', value: 'Tapa blanda' },
      { label: 'Publicación', value: '2024' }
    ],
    keyFeatures: [
      { icon: 'FiAward', text: 'Estrategias de Liderazgo Probadas' },
      { icon: 'FiBookOpen', text: 'Estudios de Caso Reales' },
      { icon: 'FiTrendingUp', text: 'Aplicable a Equipos Modernos' }
    ],
    relatedProductIds: [2, 3]
  },
  { 
    id: 2, 
    name: 'Guía de Estudio Profundo',
    tagline: 'Herramientas para un análisis bíblico riguroso.',
    price: '$15.00', 
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200',
    ],
    description: 'Una guía diseñada para llevar tu estudio personal al siguiente nivel. Incluye métodos de investigación, guías temáticas y espacio para anotaciones personales.',
    details: [
      { label: 'Autor', value: 'Ministerio de Educación' },
      { label: 'Páginas', value: '150' },
      { label: 'Encuadernación', value: 'Anillado' }
    ],
    keyFeatures: [
      { icon: 'FiTarget', text: 'Métodos de Estudio Enfocados' },
      { icon: 'FiEdit', text: 'Espacio para Anotaciones' },
      { icon: 'FiLink', text: 'Referencias Cruzadas' }
    ],
    relatedProductIds: [1, 3]
  },
  { 
    id: 3, 
    name: 'Polo Conmemorativo Ed. 2025',
    tagline: 'Viste con orgullo el propósito de nuestra misión.',
    price: '$25.00', 
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200'
    ],
    badge: 'Nuevo',
    description: 'Celebra la Conferencia Anual 2025 con este polo de edición limitada. Fabricado con 100% algodón pima para máxima comodidad y durabilidad.',
    details: [
      { label: 'Material', value: '100% Algodón Pima' },
      { label: 'Color', value: 'Blanco' },
      { label: 'Tallas', value: 'S, M, L, XL' }
    ],
    keyFeatures: [
      { icon: 'FiStar', text: 'Calidad de Material Premium' },
      { icon: 'FiShield', text: 'Durabilidad Garantizada' },
      { icon: 'FiGift', text: 'Diseño de Edición Limitada' }
    ],
    relatedProductIds: [1, 2]
  }
];

export const eventsData = [
  { id: 1, name: 'Conferencia Anual "Visión 2025"', date: '15 de Octubre, 2025', location: 'Centro de Convenciones de Lima', imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800', description: 'El evento más importante del año donde definiremos el futuro de nuestra misión.' },
  { id: 2, name: 'Retiro de Jóvenes "Conexión"', date: '22 de Noviembre, 2025', location: 'Casa de Retiro "El Refugio"', imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800', description: 'Un fin de semana para renovar la fe y conectar con otros jóvenes.' },
];

export const trainingsData = [
  { id: 1, name: 'Capacitación Intensiva en Oratoria', date: 'Cada sábado, 10:00 AM', category: 'Comunicación' },
  { id: 2, name: 'Taller de Liderazgo de Equipos de Alto Impacto', date: '25 de Septiembre, 2025', category: 'Liderazgo' },
  { id: 3, name: 'Curso de Finanzas Personales y para la Iglesia', date: 'Primer martes de cada mes', category: 'Administración' },
];