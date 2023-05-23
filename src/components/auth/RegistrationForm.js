import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function RegisterForm() {
  const { registerUser, error } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await registerUser(userData);
    } catch (err) {
      // Error handling is done in the AuthContext
      // We are accessing the error message from the error state in the AuthContext
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;