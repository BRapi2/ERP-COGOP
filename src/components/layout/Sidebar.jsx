import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import {
  FiChevronRight,
  FiGrid,
  FiUsers,
  FiDollarSign,
  FiRepeat,
  FiFileText,
  FiBriefcase,
  FiBookOpen,
  FiSettings
} from 'react-icons/fi';

import styles from './Sidebar.module.css';

const fallbackMenuItems = [
  { title: 'Dashboard', path: '/general/dashboard', icon: <FiSettings /> },
  { title: 'Usuarios', path: '/general/usuarios', icon: <FiSettings /> },
  { title: 'Origenes', path: '/general/origenes', icon: <FiSettings /> },
  { title: 'Monedas', path: '/general/moneda', icon: <FiSettings /> },
  {
    title: 'Tipo de Cambio',
    icon: <FiSettings />,
    submenus: [
      { title: 'Tipo de Cambio', path: '/general/tipo-cambio' },
      { title: 'Tipo de Cambio Cierre', path: '/general/tipo-cambio-cierre' },
      { title: 'Cuenta Ajustes Diferencia Cambio', path: '/general/cuenta-diferencia-cambio' }
    ],
  },
  { title: 'Comprobantes', path: '/general/tipo-comprobante', icon: <FiSettings /> },
  { title: 'Centro de Costos', path: '/general/centro-costo', icon: <FiSettings /> },
  { title: 'Plan de Cuentas', path: '/general/plan-cuenta', icon: <FiSettings /> },
  {
    title: 'Conf. Fechas',
    icon: <FiSettings />,
    submenus: [
      { title: 'Año', path: '/general/year' },
      { title: 'Mes', path: '/general/mes' },
      { title: 'Amarre', path: '/general/amarre-fecha' },
    ],
  },
  {
    title: 'Conf. Proveedores',
    icon: <FiSettings />,
    submenus: [
      { title: 'Proveedores', path: '/general/proveedores' },
      { title: 'Tipo Documento', path: '/general/tipo-documento' },
      { title: 'Tipo Proveedores', path: '/general/tipo-proveedor' },
    ],
  },
];
function CustomLink({ to, children, className = '', onLinkClick, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  const handleClick = (event) => {
    if (onLinkClick) {
      onLinkClick(event);
    }
    if (props.onClick) {
      props.onClick(event);
    }
  };
  return (
    <li className={`${isActive ? styles.active : ''} ${className}`}>
      <Link to={to} onClick={handleClick} {...props}>
        {children}
      </Link>
    </li>
  );
}
const iconMap = {
  'flaticon-025-dashboard': <FiSettings />,
  'flaticon-050-info': <FiSettings />,
  'default': <FiSettings />
};
const transformApiMenu = (apiItems) => {
  if (!Array.isArray(apiItems)) return [];
  const sortedItems = [...apiItems].sort((a, b) => a.order - b.order);
  return sortedItems.map(item => {
    const hasSubmenus = item.children && item.children.length > 0;
    const transformedItem = {
      title: item.nombre,
      path: hasSubmenus ? undefined : item.url,
      icon: iconMap[item.iconStyle] || iconMap.default,
      submenus: hasSubmenus ? transformApiMenu(item.children) : [],
    };

    return transformedItem;
  });
};
function Sidebar({ onLinkClick }) {
  const [menuToRender, setMenuToRender] = useState(fallbackMenuItems);
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    try {
      const storedMenuJSON = localStorage.getItem('menu');
      
      if (storedMenuJSON) {
        const apiMenuData = JSON.parse(storedMenuJSON);
        
        if (Array.isArray(apiMenuData) && apiMenuData.length > 0) {
          const transformedMenu = transformApiMenu(apiMenuData);
          setMenuToRender(transformedMenu);
        }
      }
    } catch (error) {
      console.error("Error al parsear el menú del localStorage:", error);
    }
  }, []);

  const toggleSubmenu = (title) => {
    setOpenSubmenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.mainMenu}>
        {menuToRender.map((item) => (
          <React.Fragment key={item.title}>
            {item.submenus && item.submenus.length > 0 ? (
              <li>
                <div
                  className={styles.menuItemToggle}
                  onClick={() => toggleSubmenu(item.title)}
                  aria-expanded={openSubmenus[item.title] || false}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleSubmenu(item.title)}
                >
                  {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
                  <span>{item.title}</span>
                  <FiChevronRight className={styles.toggleIcon} />
                </div>
                <ul className={`${styles.submenu} ${openSubmenus[item.title] ? styles.submenuOpen : ''}`}>
                  {item.submenus.map((subItem) => (
                    <CustomLink key={subItem.title} to={subItem.path} onLinkClick={onLinkClick}>
                      <span>{subItem.title}</span>
                    </CustomLink>
                  ))}
                </ul>
              </li>
            ) : (
              <CustomLink to={item.path} className={styles.menuItem} onLinkClick={onLinkClick}>
                {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
                <span>{item.title}</span>
              </CustomLink>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}
export default Sidebar;
