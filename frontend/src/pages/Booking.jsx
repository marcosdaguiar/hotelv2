import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BookingTimeline } from '@/components/BookingSteps/BookingTimeline';
import { RoomSearch } from '@/components/BookingSteps/RoomSearch';
import { PersonalInfo } from '@/components/BookingSteps/PersonalInfo';
import { BookingSummary } from '@/components/BookingSteps/BookingSummary';
import { Separator } from '@/components/ui/separator';


export const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [listOfRooms, setListOfRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 1,
    beds: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/rooms").then((response) => {
      setListOfRooms(response.data);
    });
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const calculateTotalPrice = (checkIn, checkOut, basePrice) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return (days * basePrice).toFixed(2);
  };

  return (
    <div className="p-6 booking-page">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight]">Booking</h1>
        <Separator />
      </div>
      <BookingTimeline currentStep={currentStep} />
      
      <div className="booking-container">
        {currentStep === 1 && (
          <RoomSearch 
            listOfRooms={listOfRooms}
            setListOfRooms={setListOfRooms}
            onNext={handleNext}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            bookingData={bookingData}
            setBookingData={setBookingData}
          />
        )}
        {currentStep === 2 && (
          <PersonalInfo
            onNext={handleNext}
            onBack={handleBack}
            formData={bookingData}
            setFormData={setBookingData}
            selectedRoom={selectedRoom}
            calculateTotalPrice={calculateTotalPrice}
          />
        )}
        {currentStep === 3 && (
          <BookingSummary
            onNext={handleNext}
            onBack={handleBack}
            formData={bookingData}
            selectedRoom={selectedRoom}
            calculateTotalPrice={calculateTotalPrice}
          />
        )}

      </div>
    </div>
  );
};

