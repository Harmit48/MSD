import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="topbar">
      <div className="topbar-inner">
      <div className="brand">
        <div className="brand-mark">P4</div>
        <div>
          <div className="brand-title">EduSphere SPA</div>
          <div className="brand-sub">Harmit Suthar · 23084231044</div>
        </div>
      </div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Home
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Courses
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          About Us
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          Contact
        </NavLink>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;