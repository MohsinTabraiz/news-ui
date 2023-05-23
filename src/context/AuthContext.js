import React, { createContext, useState } from 'react';

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Define the initial states

  //Define functions

  // Create the context values
  const authContextValues = {};

  // Provide the context to the children components
  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
