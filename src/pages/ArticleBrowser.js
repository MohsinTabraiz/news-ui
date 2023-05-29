import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ArticleBrowser = () => {
  const { allData, fetchAllData } = useContext(DataContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    // Update the params state
    const updatedParams = { ...params }; // Create a new object

    if (searchKeyword) {
      updatedParams.keyword = searchKeyword;
    }
    if (filterCategory) { debugger
      updatedParams.category_id = filterCategory;
    }
    if (filterSource) {
      updatedParams.source_id = filterSource;
    }
    if (startDate) {
      updatedParams.start_date = startDate.toISOString();
    }
    if (endDate) {
      updatedParams.end_date = endDate.toISOString();
    }

    setParams(updatedParams);
    fetchAllData({ ...updatedParams, page: 1 });
  }, [searchKeyword, filterCategory, filterSource, startDate, endDate]);

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(date);
      }
    } else if (type === "end") {
      if (date >= startDate) {
        setEndDate(date);
      }
    }
  };

  const resetFilters = () => { debugger;
    setParams({});
    setSearchKeyword("");
    setFilterCategory("");
    setFilterSource("");
    setStartDate(null);
    setEndDate(null);
    fetchAllData({page:1});
  };

  const currentArticles = allData.articles;
  const { pagination } = allData;

  // Previous page
  const previousPage = () => {
    fetchAllData({ ...params, page: pagination.current_page - 1 });
  };

  // Next page
  const nextPage = () => {
    fetchAllData({ ...params, page: pagination.current_page + 1 });
  };

  return (
    <div className="container">
      <h2 className="mb-4">Article Browser</h2>

      <div className="row mb-4">
        <div className="col-md-3 m-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search by keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        <div className="col-md-3 m-1">
          <select
            className="form-control"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {allData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 m-1">
          <select
            className="form-control"
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
          >
            <option value="">All Sources</option>
            {allData.sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 m-1">
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => handleDateChange(date, "start")}
            placeholderText="Start Date"
          />
        </div>

        <div className="col-md-3 m-1">
          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date) => handleDateChange(date, "end")}
            placeholderText="End Date"
          />
        </div>

        <div className="col-md-3 m-1">
          <button className="btn btn-secondary" onClick={resetFilters}>
            Reset
          </button>
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

export default ArticleBrowser;
