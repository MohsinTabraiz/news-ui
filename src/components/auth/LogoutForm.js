import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LogoutForm = () => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Call the logoutUser function from AuthContext
    logoutUser();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutForm;
