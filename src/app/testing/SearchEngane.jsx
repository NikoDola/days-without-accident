"use client";

import React, { useState } from "react";

export default function SearchEngine  ({ lista })  {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("a-b"); // 'a-b' or 'b-a'
  const [filterType, setFilterType] = useState("string"); // 'string' or 'number'

  // Filter function
  const filterAndSortList = () => {
    let filteredList = lista.filter((item) => {
      if (filterType === "number") {
        return typeof item === "number" && item.toString().includes(searchTerm);
      }
      return typeof item === "string" && item.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Sort the filtered list
    return filteredList.sort((a, b) => {
      if (filterType === "number") {
        return sortOrder === "a-b" ? a - b : b - a; // Numeric sorting
      }
      return sortOrder === "a-b"
        ? a.localeCompare(b)
        : b.localeCompare(a); // Alphabetical sorting
    });
  };

  const filteredList = filterAndSortList();

  return (
    <div>
      <h2>Search Engine</h2>
      <div>
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Filter Type:
          <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
            <option value="string">String</option>
            <option value="number">Number</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Sort Order:
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="a-b">A-Z</option>
            <option value="b-a">Z-A</option>
          </select>
        </label>
      </div>
      <h3>Results:</h3>
      <ul>
        {filteredList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

