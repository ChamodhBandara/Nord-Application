import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../Icon';

// A single navigation item component
const NavItem = ({ item }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(pathname.startsWith(item.path));

  if (item.children) {
    return (
      <div className={isOpen ? 'nav-item open' : 'nav-item'}>
        <button onClick={() => setIsOpen(!isOpen)} className="nav-button">
          <div className="nav-button-content">
            {item.icon && <Icon path={item.icon} />}
            <span>{item.name}</span>
          </div>
          <Icon path="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" className="chevron" />
        </button>
        <div className="submenu">
          {item.children.map((child) => (
            <NavItem key={child.name} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className="nav-link" end>
        {item.icon && <Icon path={item.icon} />}
        <span>{item.name}</span>
      </NavLink>
    );
  }
};

const Sidebar = ({ title, links, onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">{title}</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavItem key={link.name} item={link} />
        ))}
      </nav>
      <div className="sidebar-footer">
        <button onClick={onLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;