import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export const SearchGuests = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("first_name");
  const [error, setError] = useState(null);

  const fetchGuests = (endpoint) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/guests/${endpoint}`)
      .then((response) => {
        console.log("guests data received:", response.data);
        onSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guests data:", error);
        if (error.response) {
          setError(`Error: ${error.response.data.message || "Failed to fetch guests data."}`);
        } else if (error.request) {
          setError("Error: No response from server. Please try again later.");
        } else {
          setError(`Error: ${error.message}`);
        }
      });
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchGuests(`searchGuests?searchTerm=${searchTerm}&searchType=${searchType}`);
    } else {
      console.log("searchTerm is empty. Fetching all guests...");
      fetchGuests("getAllGuests");
    }
  };

  return (
    <div className="mt-6 flex space-x-4 text-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
        <option value="phone_number">Phone Number</option>
      </select>
      <Button onClick={handleSearch}>Search</Button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
