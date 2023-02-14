import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/sidebar.css';

export const Sidebar = (props) => {
  const [ sidebar, setSidebar ] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  }

  return (

    <nav className={sidebar ? "sidebar active" : "sidebar"}>
      <button className="hamburger" type="button" onClick={handleSidebar}></button>
      <ul className="sidebar-inner-nav" onClick={handleSidebar}>
        <li><Link to="/">PROTEUS</Link></li>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/archive">ARCHIVE</Link></li>
        <li><Link to="/jobcreator">CREATE JOBS</Link></li>
      </ul>
    </nav>

  )
}


