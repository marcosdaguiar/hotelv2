import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React, { useState, useEffect } from 'react'
import { GuestsList } from '@/components/Guests/GuestsList';
import axios from "axios"
import { Button } from '@/components/ui/button';
import { SearchGuests } from '@/components/Guests/SearchGuests'


export const Guests = () => {
  
  useEffect(() => {
    fetchGuests("getAllGuests");
  }, []);
  
  const [listOfGuests, setListOfGuests] = useState([]);
  const [error, setError] = useState(null);

  const fetchGuests = (endpoint) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${apiUrl}/guests/${endpoint}`)
      .then((response) => {
        console.log("guests data received:", response.data);
        setListOfGuests(response.data);
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

  const handleSearchResults = (results) => {
    setListOfGuests(results);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Guests</h1>
        <Separator />
      </div>

      <SearchGuests onSearchResults={handleSearchResults} />

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="">
          <Card>
            <CardContent className="pl-6 pt-6 pr-0 mr-0 pb-0 mb-0">
              <GuestsList listOfGuests={listOfGuests} setListOfGuests={setListOfGuests} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
