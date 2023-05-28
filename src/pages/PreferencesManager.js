import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";

const PreferenceManager = () => {
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const {
    allData,
    fetchAllData,
    preferences,
    fetchPreferences,
    updatePreferences,
  } = useContext(DataContext);

  useEffect(() => {
    if (preferences) {
      setSelectedAuthors(preferences.authorsPreferred);
      setSelectedSources(preferences.sourcesPreferred);
      setSelectedCategories(preferences.categoriesPreferred);
    }
  }, [preferences]);

  const handleAuthorSelect = (author) => {
    if (selectedAuthors.some((selectedAuthor) => selectedAuthor === author)) {
      setSelectedAuthors((prevSelected) =>
        prevSelected.filter((selectedAuthor) => selectedAuthor !== author)
      );
    } else {
      setSelectedAuthors((prevSelected) => [...prevSelected, author]);
    }
  };

  const handleSourceSelect = (source) => {
    if (selectedSources.some((selectedSource) => selectedSource === source)) {
      setSelectedSources((prevSelected) =>
        prevSelected.filter((selectedSource) => selectedSource !== source)
      );
    } else {
      setSelectedSources((prevSelected) => [...prevSelected, source]);
    }
  };

  const handleCategorySelect = (category) => {
    if (
      selectedCategories.some(
        (selectedCategory) => selectedCategory === category
      )
    ) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((selectedCategory) => selectedCategory !== category)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };

  const handleUpdatePreferences = async () => {
    const updatedPreferences = {
      authorsPreferred: selectedAuthors,
      sourcesPreferred: selectedSources,
      categoriesPreferred: selectedCategories,
    };

    try {
      await updatePreferences(updatedPreferences);
      await fetchPreferences();
      await fetchAllData();
    } catch (err) {
      setError(
        "An error occurred while updating preferences. Please try again."
      );
    }
  };

  if (!allData.authors || !allData.sources || !allData.categories) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Preference Manager</h1>
      {error && <p>{error}</p>}

      <h2>Preferred Authors:</h2>
      <ul>
        {selectedAuthors.length > 0 ? (
          selectedAuthors.map((selectedAuthor) => {
            const author = allData.authors.find(
              (author) => author.id === selectedAuthor
            );
            if (author) {
              return <li key={author.id}>{author.name}</li>;
            }
            return null;
          })
        ) : (
          <li>No preferred authors selected.</li>
        )}
      </ul>

      <h2>Preferred Sources:</h2>
      <ul>
        {preferences.sourcesPreferred.length > 0 ? (
          preferences.sourcesPreferred.map((selectedSource) => {
            const source = allData.sources.find(
              (source) => source.id === selectedSource
            );
            if (source) {
              return <li key={source.id}>{source.title}</li>;
            }
            return null;
          })
        ) : (
          <li>No preferred authors selected.</li>
        )}
      </ul>

      <h2>Preferred Categories:</h2>
      <ul>
        {selectedCategories.length > 0 ? (
          selectedCategories.map((selectedCategory) => {
            const category = allData.categories.find(
              (category) => category.id === selectedCategory
            );
            if (category) {
              return <li key={category.id}>{category.title}</li>;
            }
            return null;
          })
        ) : (
          <li>No preferred categories selected.</li>
        )}
      </ul>

      <h2>Preferred Articles:</h2>
      <ul>
        {preferences.articlesPreferred.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Published at: {article.published_at}</p>
            <p>Author: {article.author}</p>
            <p>Source: {article.source}</p>
            <p>Category: {article.category}</p>
          </li>
        ))}
      </ul>

      <h2>All Authors:</h2>
      <ul>
        {allData.authors.length > 0 ? (
          allData.authors.map((author) => (
            <li key={author.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedAuthors.some(
                    (selectedAuthor) => selectedAuthor === author.id
                  )}
                  onChange={() => handleAuthorSelect(author.id)}
                />
                {author.name}
              </label>
            </li>
          ))
        ) : (
          <li>No authors</li>
        )}
      </ul>

      <h2>All Sources:</h2>
      <ul>
        {allData.sources.length > 0 ? (
          allData.sources.map((source) => (
            <li key={source.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSources.some(
                    (selectedSource) => selectedSource === source.id
                  )}
                  onChange={() => handleSourceSelect(source.id)}
                />
                {source.title}
              </label>
            </li>
          ))
        ) : (
          <li>No sources</li>
        )}
      </ul>

      <h2>All Categories:</h2>
      <ul>
        {allData.categories.length > 0 ? (
          allData.categories.map((category) => (
            <li key={category.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.some(
                    (selectedCategory) => selectedCategory === category.id
                  )}
                  onChange={() => handleCategorySelect(category.id)}
                />
                {category.title}
              </label>
            </li>
          ))
        ) : (
          <li>No categories</li>
        )}
      </ul>

      <button onClick={handleUpdatePreferences}>Update Preferences</button>
    </div>
  );
};

export default PreferenceManager;
