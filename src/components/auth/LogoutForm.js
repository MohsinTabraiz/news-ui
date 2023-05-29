import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LogoutForm = () => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Call the logoutUser function from AuthContext
    logoutUser();
  };

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutForm;
