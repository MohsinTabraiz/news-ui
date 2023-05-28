import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState({
    authors: [],
    sources: [],
    categories: [],
    articles: [],
  });
  const [preferences, setPreferences] = useState({
    authorsPreferred: [],
    sourcesPreferred: [],
    categoriesPreferred: [],
    articlesPreferred: [],
  });
  const [error, setError] = useState(null);

  const authInterceptor = axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const fetchAllData = async (params) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/get-all-data",
        { params }
      );
      const { authors, sources, categories, articles } = response.data.data;
      setAllData({ authors, sources, categories, articles });
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
    }
  };

  const fetchPreferences = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/get-preferences"
      );
      const { articles, authors, categories, sources } = response.data.data;
      setPreferences({
        authorsPreferred: authors,
        sourcesPreferred: sources,
        categoriesPreferred: categories,
        articlesPreferred: articles,
      });
    } catch (err) {
      setError(
        "An error occurred while fetching preferred data. Please try again."
      );
    }
  };

  const updatePreferences = async (newPreferences) => {
    try {
      const updatePreferencesRequest = {
        authors: newPreferences.authorsPreferred,
        categories: newPreferences.categoriesPreferred,
        sources: newPreferences.sourcesPreferred,
      };
      await axios.put(
        process.env.REACT_APP_API_BASE_URL + "/update-preferences",
        updatePreferencesRequest
      );
    } catch (err) {
      setError(
        "An error occurred while updating preferences. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchPreferences();

    return () => {
      // Clean up the interceptor when the component is unmounted
      axios.interceptors.request.eject(authInterceptor);
    };
  }, []);

  const dataContextValues = {
    allData,
    preferences,
    error,
    fetchAllData,
    fetchPreferences,
    updatePreferences,
  };

  return (
    <DataContext.Provider value={dataContextValues}>
      {children}
    </DataContext.Provider>
  );
};
