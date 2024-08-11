import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';
import { logoUrl } from '../controller/URLManager';
const Header = ({ isLoggedIn }) => {
  // console.log(isLoggedIn);

  const Navigate = useNavigate()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      // Call your method here with the query value
      console.log('Search query:', query);
      Navigate('/search?q='+query)
      // You can also navigate to a different route or trigger a search function
    }
  }

  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '1rem 2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ flex: 1 }}>
        <Link to="/">
          <img src={logoUrl} alt="Logo" style={{ height: '40px' }} />
        </Link>
      </div>
      <nav style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <Link to="/questions">Questions</Link>
        <Link to="/ask">Ask</Link>
      </nav>
      <div style={{ flex: 3, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search..."
          onKeyDown={handleKeyDown}
          style={{ width: '100%', maxWidth: '300px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}

        />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {isLoggedIn ? (
          <div style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link to="/profile">Profile</Link>
            <Link to="/signout">Sign Out</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
