import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useWindowDimensions from './UseWindowDimensions';
import '@picocss/pico/css/pico.min.css';
import { logoUrl } from '../controller/URLManager';
import logo from '../assets/logo.png'
import '../css/Header.css';
import { getLocal } from '../controller/ProjectData';


const Header = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const Navigate = useNavigate();
  const local = getLocal();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      console.log('Search query:', query);
      Navigate('/search?q=' + query);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { width } = useWindowDimensions();

  useEffect(() => {
    setMenuOpen(width > 640);
  }, [width])

  return (
    <header className="Header">
      <div style={{ flex: 0.5, display: 'flex', justifyContent: 'center' }}> 
        <Link to="/" onClick={() => { setMenuOpen(width > 640) }}>
          {/* <span>BugSolved</span> */}
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </Link>
      </div>

      <nav style={{ flex: 1, display: menuOpen ? 'flex' : 'none', justifyContent: 'center', gap: '2rem' }} className="nav-links">
        <Link className='headerLinks' to="/questions" onClick={() => {  setMenuOpen(width>640) }}>Questions</Link>
        <Link className='headerLinks' to={local ? '/ask': '/login'} onClick={() => { setMenuOpen(width > 640) }}>Ask</Link>
      </nav>
      <div style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        <input
          className='searchInput'
          type="search"
          placeholder="Search..."
          onKeyDown={handleKeyDown}
          onClick={() => { setMenuOpen(width > 640) }}
        />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '6px' }}>
        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          {isLoggedIn ? (
            <>
              <Link className='headerLinks' to="/profile" onClick={() => { setMenuOpen(width > 640) }}>Profile</Link>
            </>
          ) : (
              <Link className='headerLinks' to="/login" onClick={() => { setMenuOpen(width > 640) }}>Login</Link>
          )}
        </div>
        <div className="menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer', fontSize: '2rem' }}>
          {menuOpen ? <>&#10005;</>:<>&#9776;</>}
        </div>
      </div>
      <style>
        {`
          @media (max-width: 640px) {
            .menu-icon {
              display: block;
            }
            .nav-links {
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: #242a35 ;
              padding: 20px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              z-index: 1;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
