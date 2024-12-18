import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BookingTimeline } from '../Components/BookingSteps/BookingTimeline';
import { RoomSearch } from '../Components/BookingSteps/RoomSearch';
import '../Styles/Booking.css';

export const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [listOfRooms, setListOfRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 1,
    beds: 1
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/rooms").then((response) => {
      setListOfRooms(response.data);
    });
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };


  return (
    <div className="booking-page">
      <header className="header">
        <h1>Room Booking</h1>
        <hr />
      </header>
      
      <BookingTimeline currentStep={currentStep} />
      
      <div className="booking-container">
        <RoomSearch 
          listOfRooms={listOfRooms}
          setListOfRooms={setListOfRooms}
          onNext={handleNext}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
      </div>
    </div>
  );
};
