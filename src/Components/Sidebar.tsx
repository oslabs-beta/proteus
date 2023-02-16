import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/sidebar.css';

export const Sidebar = () => {
  const [ sidebar, setSidebar ] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
    // document.getElementById("sidebar").style.width = "250px";
  }

  return (
    <nav id="sidebar" className={sidebar ? "sidebar" : "sidebar_active"} onClick={handleSidebar}>
      <li className="closebtn" onClick={handleSidebar}>X</li>
      <div className='sidebar_links'>
        <li className="links" id="sidebar_proteus"><Link to="/">PROTEUS</Link></li>
        <li className="links" id="sidebar_home"><Link to="/">HOME</Link></li>
        <li className="links" id="sidebar_archive"><Link to="/archive">ARCHIVE</Link></li>
        <li className="links" id="sidebar_jobcreator"><Link to="/jobcreator">CREATE JOBS</Link></li>
      </div>
    </nav>

  )
}

{/* <nav className={sidebar ? "sidebar active" : "sidebar"}>
<button className="hamburger" type="button" onClick={handleSidebar}></button>
<ul className="sidebar-inner-nav" onClick={handleSidebar}>
  <li><Link to="/">PROTEUS</Link></li>
  <li><Link to="/">HOME</Link></li>
  <li><Link to="/archive">ARCHIVE</Link></li>
  <li><Link to="/jobcreator">CREATE JOBS</Link></li>
</ul>
</nav> */}
