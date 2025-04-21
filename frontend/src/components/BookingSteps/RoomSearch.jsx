import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

export const RoomSearch = ({ 
  onNext, 
  selectedRoom, 
  setSelectedRoom,
  bookingData,
  setBookingData 
}) => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRoomSelect = (e, room) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedRoom?.type_name === room.type_name) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom(room);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextClick = () => {
    if (selectedRoom) {
      console.log('Selected room type:', selectedRoom.type_name);
      onNext();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/room_types`);      
      if (!response.ok) {
        throw new Error('Failed to fetch room types');
      }
      const roomTypes = await response.json();
      console.log('Fetched room types:', roomTypes);
      
      // Filter rooms based on guest capacity
      const filtered = roomTypes.filter(room => 
        parseInt(room.max_capacity) >= parseInt(bookingData.guests)
      );
      console.log('Filtered rooms:', filtered);
      
      setFilteredRooms(filtered);
    } catch (error) {
      console.error('Error during search:', error);
      setFilteredRooms([]);
    }
  };

  return (
    <div className="booking-step relative flex flex-col justify-center items-center">
      <Card className="  flex p-2 mt-2 shadow-lg rounded-lg w-full max-w-3xl"> 
        <form onSubmit={handleSearch} className="search-form flex justify-center w-full ">
          <div className="search-row flex gap-6 justify-evenly w-full">
            <div className="search-group w-52">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in</label>
              <Input
                type="date"
                id="checkIn"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="search-group w-52">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out</label>
              <Input
                type="date"
                id="checkOut"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleInputChange}
                min={bookingData.checkIn}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="search-group">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
              <select
                id="guests"
                name="guests"
                value={bookingData.guests}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-20 border border-gray-300 rounded-md text-sm"
              >
                {[...Array(8)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="self-end mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Search
            </Button>
          </div>
        </form>
      </Card>

      <div className="room-cards p-6 pl-[8%]  flex flex-wrap justify-start  gap-6 w-full">
        {filteredRooms.map((room) => (
          <Card 
            key={room.id}
            className={`room-card p-4 w-80 shadow-md rounded-lg ${selectedRoom?.id === room.id ? 'border-2 border-blue-500' : ''}`}
          >
            <div className="room-card-header mb-4">
              <h3 className="text-lg font-semibold">{room.type_name}</h3>
              <span className="room-price text-gray-600">From ${room.base_price}/night</span>
            </div>
            <div className="room-card-content">
              <div className="room-features space-y-2">
                <div className="feature">
                  <span className="feature-label font-medium">Bed Size:</span>
                  <span className="feature-value ml-2">{room.bed_size}</span>
                </div>
                <div className="feature">
                  <span className="feature-label font-medium">Bed Quantity:</span>
                  <span className="feature-value ml-2">{room.bed_qty}</span>
                </div>
                <div className="feature">
                  <span className="feature-label font-medium">Max Capacity:</span>
                  <span className="feature-value ml-2">{room.max_capacity}</span>
                </div>
              </div>
              <Button 
                className={`select-button mt-4 w-full ${selectedRoom?.id === room.id ? 'bg-blue-500 text-white' : 'bg-gray-400'}`}
                onClick={(e) => handleRoomSelect(e, room)}
              >
                {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {hasSearched && filteredRooms.length === 0 && (
        <div className="no-rooms-message mt-6 text-center text-red-500">
          No rooms available for {bookingData.guests} guests. Please try different search parameters.
        </div>
      )}

      <Button 
        onClick={handleNextClick}
        disabled={!selectedRoom}
        className="next-button fixed bottom-10 right-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-0"
      >
        Next
      </Button>
    </div>
  );
};
