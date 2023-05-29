import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [allData, setAllData] = useState({
    authors: [],
    sources: [],
    categories: [],
    articles: [],
    pagination:{
      current_page: 0,
      per_page: 0,
      last_page: 0,
      total: 0,
    }
  });
  const [preferences, setPreferences] = useState({
    authorsPreferred: [],
    sourcesPreferred: [],
    categoriesPreferred: [],
    articlesPreferred: [],
    pagination:{
      current_page: 0,
      per_page: 0,
      last_page: 0,
      total: 0,
    }
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
        {params: {...params, limit: 10}}
      );
      const { authors, sources, categories, articles } = response.data.data;
      const {data:articlesData, current_page, last_page, per_page, total} = articles;

      setAllData({ authors, sources, categories, articles: articlesData, pagination: {current_page, last_page, per_page, total} });
    } catch (err) {
      setError("An error occurred while fetching data. Please try again.");
    }
  };

  const fetchPreferences = async (params) => { 
    try { 
      const response = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/get-preferences",
        { params: {...params} }
      );
      const { articles, authors, categories, sources } = response.data.data;
      const {data:articlesData, current_page, last_page, per_page, total} = articles;

      setPreferences({
        authorsPreferred: authors,
        sourcesPreferred: sources,
        categoriesPreferred: categories,
        articlesPreferred: articlesData,
        pagination: {current_page, last_page, per_page, total}
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
    fetchAllData({page: 1});
    fetchPreferences({page: 1});

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
