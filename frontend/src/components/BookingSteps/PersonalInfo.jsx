import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Heading1 } from 'lucide-react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '../ui/tabs';
import { SearchGuests } from '@/components/Guests/SearchGuests';
import { NewGuests } from '@/components/Guests/NewGuests';

export const PersonalInfo = ({ onNext, onBack, formData, setFormData, selectedRoom, calculateTotalPrice }) => {
  const [errors, setErrors] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (e) => {
    handleChange(e);
    const { name, value } = e.target;
    if (name === 'firstName' || name === 'lastName') {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/guests/searchGuests`, {
          params: { name: value }
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching guests:', error);
      }
    }
  };

  const handleSelectGuest = (guest) => {
    setSelectedGuestId(guest.guest_id);
    setFormData(prevFormData => ({
        ...prevFormData,
        guest_id: guest.guest_id,
        firstName: guest.first_name,
        lastName: guest.last_name,
        email: guest.email,
        phone: guest.phone_number,
        address: guest.address,
        apt: guest.apt,
        city: guest.city,
        state: guest.state,
        zip: guest.postal_code,
        country: guest.country
    }));
    
};

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };
  
  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({
      ...formData,
      phone: formattedPhone
    });
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip) newErrors.zip = 'Zip is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/guests/newGuest`, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          address: formData.address,
          apt: formData.apt,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zip,
          country: formData.country
        });
  
        if (response.status === 200) {
          onNext();
        }
      } catch (error) {
        console.error('Error creating guest:', error);
        setErrors({ submit: 'Failed to save guest information' });
      }
    }
  };

  return (
    <div className="booking-step p-4 flex flex-col items-center w-[100%]">
      {selectedRoom && (
        <Card className="booking-details border-gray-400 w-[1000px]">
          <CardTitle className='text-lg font-semibold pl-6 pt-4'>
            Booking Details:
          </CardTitle>
          <CardContent className='flex justify-center gap-8 mt-2 text-sm w-[100%] text-slate-800 '>
            <p><strong>Check-in:</strong> <br/>{new Date(formData.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> <br/>{new Date(formData.checkOut).toLocaleDateString()}</p>
            <p><strong>Room Type:</strong> <br/>{selectedRoom.type_name}</p>
            <p><strong>Price:</strong> <br/>${selectedRoom.base_price}/night</p>
            <p><strong>Bed Size:</strong> <br/>{selectedRoom.bed_size}</p>
            <p><strong>Beds Qty:</strong><br/> {selectedRoom.bed_qty}</p>
            <p><strong>Max Capacity:</strong> <br/>{selectedRoom.max_capacity} guests</p>
            <Card className='flex-col text-white p-2 border flex text-lg font-bold bg-red-500'>TOTAL: $ {calculateTotalPrice(formData.checkIn, formData.checkOut, selectedRoom.base_price)} <br/> <p className='text-xs'>(taxes and fees not included)</p> </Card>
          </CardContent>
        </Card>
      )}
      <Tabs value={tabIndex} onValueChange={setTabIndex} className="w-[1000px] mt-4">
        <TabsList>
          <TabsTrigger value={0}>Existing Customer</TabsTrigger>
          <TabsTrigger value={1}>New Customer</TabsTrigger>
        </TabsList>
        <TabsContent value={1}>
          <NewGuests
            formData={formData}
            handleChange={handleChange}
            handlePhoneChange={handlePhoneChange}
            errors={errors}
          />
        </TabsContent>
        <TabsContent value={0}>
            <div className="personal-info-form ">
              <SearchGuests onSearchResults={setSearchResults} />
              {searchResults.length > 0 && (
                
                <div className="search-results mt-4 h-[350px] overflow-y-auto">
                  
                  <ul>
                    {searchResults.map((guest) => (
                      <li
                      key={guest.guest_id}
                      className="hover:bg-gray-300 p-2 rounded flex justify-between items-center"
                    >
                      <div className="flex-1">
                        {guest.first_name} {guest.last_name} - {guest.email} - {guest.phone_number}
                      </div>
                      <Button
                        className={`select-button ${
                          selectedGuestId === guest.guest_id ? 'bg-blue-500 text-white' : 'bg-gray-400'
                        }`}
                        onClick={() => handleSelectGuest(guest)}
                      >
                        {selectedGuestId === guest.guest_id ? 'Selected' : 'Select'}
                      </Button>
                    </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
      </Tabs>
      <Button onClick={onBack} variant='destructive' className="fixed bottom-10 left-72">
        Back
      </Button>
      <Button onClick={handleNext} className="fixed bottom-10 right-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-0">
        Next
      </Button>
    </div>
  );
};