import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/Booking-RoomSearch.css';

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/room_types`);      
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
    <div className="booking-step">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-row">
          <div className="search-group">
            <label htmlFor="checkIn">Check-in</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={bookingData.checkIn}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="search-group">
            <label htmlFor="checkOut">Check-out</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={bookingData.checkOut}
              onChange={handleInputChange}
              min={bookingData.checkIn}
              required
            />
          </div>

          <div className="search-group">
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              name="guests"
              value={bookingData.guests}
              onChange={handleInputChange}
              required
            >
              {[...Array(8)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

        <div className="room-cards">
        {filteredRooms.map((room) => (
          <div 
          key={room.id}
          className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
          >
          <div className="room-card-header">
            <h3>{room.type_name}</h3>
            <span className="room-price">From ${room.base_price}/night</span>
          </div>
          <div className="room-card-content">
            <p className="room-description">{room.description}</p>
            <div className="room-features">
            <div className="feature">
              <span className="feature-label">Bed Size:</span>
              <span className="feature-value">{room.bed_size}</span>
            </div>
            <div className="feature">
              <span className="feature-label">Bed Quantity:</span>
              <span className="feature-value">{room.bed_qty}</span>
            </div>
            <div className="feature">
              <span className="feature-label">Max Capacity:</span>
              <span className="feature-value">{room.max_capacity}</span>
            </div>
            </div>
            <button 
            className={`select-button ${selectedRoom?.id === room.id ? 'selected' : ''}`}
            onClick={(e) => handleRoomSelect(e, room)}
            >
            {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
            </button>
          </div>
          </div>
        ))}
        </div>

      {hasSearched && filteredRooms.length === 0 && (
        <div className="no-rooms-message">
          No rooms available for {bookingData.guests} guests. Please try different search parameters.
        </div>
      )}

      <button 
        onClick={onNext}
        disabled={!selectedRoom}
        className="next-button"
      >
        Next
      </button>
    </div>
  );
};
