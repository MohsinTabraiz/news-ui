import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const PreferenceManager = () => {
  const {
    allData,
    fetchAllData,
    preferences,
    fetchPreferences,
    updatePreferences,
  } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [showAuthorCheckboxes, setShowAuthorCheckboxes] = useState(false);
  const [showSourceCheckboxes, setShowSourceCheckboxes] = useState(false);
  const [showCategoryCheckboxes, setShowCategoryCheckboxes] = useState(false);

  useEffect(() => {
    if (preferences) {
      setSelectedAuthors(preferences.authorsPreferred);
      setSelectedSources(preferences.sourcesPreferred);
      setSelectedCategories(preferences.categoriesPreferred);
    }
  }, [preferences]);

  const handleAuthorSelect = (author) => {
    if (selectedAuthors.includes(author)) {
      setSelectedAuthors((prevSelected) =>
        prevSelected.filter((selectedAuthor) => selectedAuthor !== author)
      );
    } else {
      setSelectedAuthors((prevSelected) => [...prevSelected, author]);
    }
  };

  const handleSourceSelect = (source) => {
    if (selectedSources.includes(source)) {
      setSelectedSources((prevSelected) =>
        prevSelected.filter((selectedSource) => selectedSource !== source)
      );
    } else {
      setSelectedSources((prevSelected) => [...prevSelected, source]);
    }
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
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
      setIsLoading(true);

      await updatePreferences(updatedPreferences);
      await fetchPreferences({ page: 1 });
      await fetchAllData();
    } catch (err) {
      setError(
        "An error occurred while updating preferences. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!allData.authors || !allData.sources || !allData.categories) {
    return <div>Loading...</div>;
  }

  const currentArticles = preferences.articlesPreferred;
  const { pagination } = preferences;

  // Previous page
  const previousPage = () => {
    fetchPreferences({ page: pagination.current_page - 1 });
  };

  // Next page
  const nextPage = () => {
    fetchPreferences({ page: pagination.current_page + 1 });
  };

  return (
    <div className="container">
      <h1 className="mb-4">Preference Manager</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="border p-3 mb-4 mt-2"
        onMouseEnter={() => {
          setShowAuthorCheckboxes(true);
          setShowSourceCheckboxes(true);
          setShowCategoryCheckboxes(true);
        }}
        onMouseLeave={() => {
          setShowAuthorCheckboxes(false);
          setShowSourceCheckboxes(false);
          setShowCategoryCheckboxes(false);
        }}
        style={{
          boxShadow: "rgb(56 54 54 / 62%) 0px 0px 8px", // Adjust the values to get the desired effect
        }}
      >
        <h4 className="mb-2">
          Update Preference{" "}
          <FontAwesomeIcon icon={faCog} className="gear-icon" />
        </h4>
        {showAuthorCheckboxes && (
          <div className="row">
            <div className="col-md-12">
              <h2>All Authors:</h2>
              <div className="row">
                {allData.authors.length > 0 ? (
                  allData.authors.map((author) => (
                    <div key={author.id} className="col-md-3 mb-3">
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedAuthors.includes(author.id)}
                          onChange={() => handleAuthorSelect(author.id)}
                        />
                        <span className="form-check-label">{author.name}</span>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="col">
                    <div className="alert alert-info">
                      No authors available.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showSourceCheckboxes && (
          <div className="col-md-12">
            <h2>All Sources:</h2>
            <div className="row">
              {allData.sources.length > 0 ? (
                allData.sources.map((source) => (
                  <div key={source.id} className="col-md-3 mb-3">
                    <label className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedSources.includes(source.id)}
                        onChange={() => handleSourceSelect(source.id)}
                      />
                      <span className="form-check-label">{source.title}</span>
                    </label>
                  </div>
                ))
              ) : (
                <div className="col">
                  <div className="alert alert-info">No sources available.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {showCategoryCheckboxes && (
          <div className="row">
            <div className="col-md-12">
              <h2>All Categories:</h2>
              <div className="row">
                {allData.categories.length > 0 ? (
                  allData.categories.map((category) => (
                    <div key={category.id} className="col-md-3 mb-3">
                      <label className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategorySelect(category.id)}
                        />
                        <span className="form-check-label">
                          {category.title}
                        </span>
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="col">
                    <div className="alert alert-info">
                      No categories available.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showAuthorCheckboxes &&
          showSourceCheckboxes &&
          showCategoryCheckboxes && (
            <button
              className="btn btn-primary"
              onClick={handleUpdatePreferences}
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Update Preferences"
              )}
            </button>
          )}
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <div className="border p-3">
              <h2 className="mb-3">Preferred Authors:</h2>
              <div className="d-flex flex-wrap">
                {preferences.authorsPreferred.length > 0 ? (
                  preferences.authorsPreferred.map((selectedAuthor) => {
                    const author = allData.authors.find(
                      (author) => author.id === selectedAuthor
                    );
                    if (author) {
                      return (
                        <span
                          key={author.id}
                          className="badge bg-primary me-2 mb-2"
                        >
                          {author.name}
                        </span>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className="badge bg-secondary">
                    No preferred authors selected.
                  </div>
                )}
              </div>
            </div>

            <div className="border p-3">
              <h2 className="mb-3">Preferred Sources:</h2>
              <div className="d-flex flex-wrap">
                {preferences.sourcesPreferred.length > 0 ? (
                  preferences.sourcesPreferred.map((selectedSource) => {
                    const source = allData.sources.find(
                      (source) => source.id === selectedSource
                    );
                    if (source) {
                      return (
                        <span
                          key={source.id}
                          className="badge bg-primary me-2 mb-2"
                        >
                          {source.title}
                        </span>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className="badge bg-secondary">
                    No preferred sources selected.
                  </div>
                )}
              </div>
            </div>

            <div className="border p-3">
              <h2 className="mb-3">Preferred Categories:</h2>
              <div className="d-flex flex-wrap">
                {preferences.categoriesPreferred.length > 0 ? (
                  preferences.categoriesPreferred.map((selectedCategory) => {
                    const category = allData.categories.find(
                      (category) => category.id === selectedCategory
                    );
                    if (category) {
                      return (
                        <span
                          key={category.id}
                          className="badge bg-primary me-2 mb-2"
                        >
                          {category.title}
                        </span>
                      );
                    }
                    return null;
                  })
                ) : (
                  <div className="badge bg-secondary">
                    No preferred categories selected.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Published At</th>
            <th>Author</th>
            <th>Source</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {currentArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.published_at}</td>
              <td>{article.author?.name}</td>
              <td>{article.source?.title}</td>
              <td>{article.category?.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination">
        <li
          className={`page-item ${
            pagination.current_page === 1 ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={previousPage}>
            Previous
          </button>
        </li>
        <li key={pagination.current_page} className="page-item active">
          <span className="page-link">{pagination.current_page} </span>
        </li>
        <li
          className={`page-item ${
            pagination.current_page < pagination.last_page ? "" : "disabled"
          }`}
        >
          <button className="page-link" onClick={nextPage}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PreferenceManager;
