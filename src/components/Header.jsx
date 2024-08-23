import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';
import { logoUrl } from '../controller/URLManager';
import '../css/Header.css';

const Header = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const Navigate = useNavigate();

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

  return (
    <header className="Header">
      <div style={{ flex: 1, display:'flex', justifyContent:'center' }}>
        <Link to="/">
          {/* <span>BugSolved</span> */}
          <img src={logoUrl} alt="Logo" style={{ height: '40px' }} />
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer' }}>
        &#9776;
      </div>
      <nav style={{ flex: 1, display: menuOpen ? 'flex' : 'none', justifyContent: 'center', gap: '2rem' }} className="nav-links">
        <Link className='headerLinks' to="/questions">Questions</Link>
        <Link className='headerLinks' to="/ask">Ask</Link>
      </nav>
      <div style={{ flex: 3, display: 'flex', justifyContent: 'center' }}>
        <input
          className='searchInput'
          type="text"
          placeholder="Search..."
          onKeyDown={handleKeyDown}
         
        />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {isLoggedIn ? (
          <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Link className='headerLinks' to="/profile">Profile</Link>
            <Link className='headerLinks' to="/signout">Sign Out</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <style>
        {`
          @media (max-width: 768px) {
            .menu-icon {
              display: block;
            }
            .nav-links {
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: white;
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
