import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import RegistrationPage from "./pages/auth/RegistrationPage";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import Header from "./components/Header";
import { DataProvider } from "./context/DataContext";
import ArticleBrowser from "./pages/ArticleBrowser";
import PreferenceManager from "./pages/PreferencesManager";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/articles" element={<ArticleBrowser />} />
          <Route path="/preferences" element={<PreferenceManager />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
