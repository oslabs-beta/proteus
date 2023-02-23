import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import '../Styles/sidebar.css';


export const Nav = () => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{backgroundColor: theme.bgSecondary, border: `1px solid ${theme.borderPrimary}`}} className='nav-bar'>
        <div className='nav-bar-icon'><Link to="/"><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textPrimary}}>HOME</div></Link></div>
        <div className='nav-bar-icon'><Link to="/archive"><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textPrimary}}>ARCHIVE</div></Link></div>
        <div className='nav-bar-icon'><Link to="/jobcreator"><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textPrimary}}>CREATE</div></Link></div>
        <div className='nav-bar-icon'><a onClick={() => theme.toggleTheme()} style={{cursor: "pointer"}}><div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textPrimary}}>THEME</div></a></div>
    </div>
  )
}
