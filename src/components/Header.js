import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { token } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!token && (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
          {token && (
            <li><Link to="/logout">Logout</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
