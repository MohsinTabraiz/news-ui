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
  
  useEffect(() => {
    const params = {};

    if (searchKeyword) params.keyword = searchKeyword;
    if (filterCategory) params.category_id = filterCategory;
    if (filterSource) params.source_id = filterSource;
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();

    fetchAllData(params);
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

  const resetFilters = () => {
    setSearchKeyword("");
    setFilterCategory("");
    setFilterSource("");
    setStartDate(null);
    setEndDate(null);
    fetchAllData();
  };

  return (
    <div>
      <h2>Article Browser</h2>

      <div>
        <input
          type="text"
          placeholder="Search by keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <select
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

        <select
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

        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange(date, "start")}
          placeholderText="Start Date"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => handleDateChange(date, "end")}
          placeholderText="End Date"
        />

        <button onClick={resetFilters}>Reset</button>
      </div>

      <ul>
        {allData.articles.map((article) => (
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
    </div>
  );
};

export default ArticleBrowser;
