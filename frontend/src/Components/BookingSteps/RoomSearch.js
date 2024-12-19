import React, { useState, useEffect } from 'react';
import '../../Styles/Booking-RoomSearch.css';

export const RoomSearch = ({ 
  listOfRooms, 
  setListOfRooms, 
  onNext, 
  selectedRoom, 
  setSelectedRoom,
  bookingData,
  setBookingData 
}) => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);  // Add hasSearched state

  // Group rooms by type and find minimum price
  useEffect(() => {
    const groupedRooms = listOfRooms.reduce((acc, room) => {
      if (!acc[room.room_type]) {
        acc[room.room_type] = {
          ...room,
          room_price: Math.min(room.room_price)
        };
      } else {
        acc[room.room_type].room_price = Math.min(acc[room.room_type].room_price, room.room_price);
      }
      return acc;
    }, {});

    setFilteredRooms(Object.values(groupedRooms));
  }, [listOfRooms]);

  const handleRoomSelect = (e, room) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedRoom?.room_type === room.room_type) {
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

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);  // Set hasSearched to true
    
    // Filter rooms based on bed count
    let filtered = listOfRooms.filter(room => 
      room.room_bed_count >= bookingData.guests
    );

    // Group by type and find minimum price
    const groupedRooms = filtered.reduce((acc, room) => {
      if (!acc[room.room_type]) {
        acc[room.room_type] = {
          ...room,
          room_price: Math.min(room.room_price)
        };
      } else {
        acc[room.room_type].room_price = Math.min(acc[room.room_type].room_price, room.room_price);
      }
      return acc;
    }, {});

    setFilteredRooms(Object.values(groupedRooms));
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
            <input
                type="number"
                id="guests"
              name="guests"
              value={bookingData.guests}
              onChange={handleInputChange}
              min="1"
              max="10"
              required
            />
          </div>




          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

        <div className="room-cards">
        {filteredRooms.map((room) => (
          <div 
          key={room.room_type}
          className={`room-card ${selectedRoom?.room_type === room.room_type ? 'selected' : ''}`}
          >
          <div className="room-card-header">
            <h3>{room.room_type} - {room.room_bed_size}</h3>
            <span className="room-price">From ${room.room_price}/night</span>
          </div>
          <div className="room-card-content">
            <div className="room-features">
            <div className="feature">
              <span className="feature-label">Beds:</span>
              <span className="feature-value">{room.room_bed_count}</span>
            </div>
            <div className="feature">
              <span className="feature-label">View:</span>
              <span className="feature-value">{room.room_view}</span>
            </div>
            <div className="feature">
              <span className="feature-label">Available:</span>
              <span className="feature-value">{room.available_rooms} rooms</span>
            </div>
            </div>
            <button 
            className={`select-button ${selectedRoom?.room_type === room.room_type ? 'selected' : ''}`}
            onClick={(e) => handleRoomSelect(e, room)}
            >
            {selectedRoom?.room_type === room.room_type ? 'Selected' : 'Select Room'}
            </button>
          </div>
          </div>
        ))}
        </div>

      {hasSearched && filteredRooms.length === 0 && (
        <div className="no-rooms-message">
          No rooms available with {bookingData.beds} bed(s). Please try different search parameters.
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

