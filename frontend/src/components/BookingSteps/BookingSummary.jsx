import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export const BookingSummary = (props) => {
  const {
    formData,
    selectedRoom,
    calculateTotalPrice,
    onBack,
    onNext
  } = props;

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const TotalPrice = parseFloat(calculateTotalPrice(formData.checkIn, formData.checkOut, selectedRoom.base_price));
  const tax = parseFloat((TotalPrice * 0.07).toFixed(2));
  const fees = parseFloat((TotalPrice * 0.15).toFixed(2));
  const total = (TotalPrice + tax + fees).toFixed(2);

  return (
    <div className="booking-step p-4 flex gap-6 justify-center w-[100%] h-full">
      {selectedRoom && (
        <>
        <Card className="flex booking-details  border-gray-400 w-[1000px]"> 
            
            <CardContent className='mt-2 text-sm w-[100%] text-slate-700 '>
                <CardTitle className='text-slate-700 text-lg font-semibold pl-2 pt-4 '>
                    Room Summary:
                </CardTitle>
                <p className='p-2'><strong>Check-in:</strong> <br/>{new Date(formData.checkIn).toLocaleDateString()}</p>            
                <p className='p-2'><strong>Check-out:</strong> <br/>{new Date(formData.checkOut).toLocaleDateString()}</p>
                <p className='p-2'><strong>Room Type:</strong> <br/>{selectedRoom.type_name}</p>
                <p className='p-2'><strong>Price:</strong> <br/>${selectedRoom.base_price}/night</p>           
                <p className='p-2'><strong>Bed Size:</strong> <br/>{selectedRoom.bed_size}</p>           
                <p className='p-2'><strong>Beds Qty:</strong><br/> {selectedRoom.bed_qty}</p>           
                <p className='p-2'><strong>Max Capacity:</strong> <br/>{selectedRoom.max_capacity} guests</p> 
            </CardContent>
                
            <CardContent className='mt-2 text-sm w-[100%] text-slate-700 '>
                <CardTitle className='text-slate-700 text-lg font-semibold pl-2 pt-4 '>
                    Personal Information:
                </CardTitle>
                <p className='p-2'><strong>First Name:</strong> <br/>{formData.firstName}</p>            
                <p className='p-2'><strong>Last Name:</strong> <br/>{formData.lastName}</p>
                <p className='p-2'><strong>Phone:</strong> <br/>{formData.phone}</p>
                <p className='p-2'><strong>Email:</strong> <br/>{formData.email}</p>
                <p className='p-2'><strong>Address:</strong> <br/>{formData.address}</p>            
                <p className='p-2'><strong>Apartment:</strong> <br/>{formData.apt}</p>
                <p className='p-2'><strong>City:</strong> <br/>{formData.city}</p>
                <p className='p-2'><strong>State:</strong> <br/>{formData.state}</p>
                <p className='p-2'><strong>Zip/postal code:</strong> <br/>{formData.zip}</p>
                <p className='p-2'><strong>Country:</strong> <br/>{formData.country}</p>            
            </CardContent>
            
        </Card>
        <Card className='bg-green-100  border-gray-400 w-[20%] h-full p-0 border  text-sm text-slate-700 flex-col justify-center'>
                
                <CardTitle className='flex justify-center   text-slate-700 text-lg font-semibold pl-2 pt-4 '>
                    Cost Summary: 
                </CardTitle>
                <div className='grid grid-cols-2 justify-end '>
                    <CardContent className='mt-2 pr-0 text-sm text-slate-700 '>
                        <p className='pr-2 flex justify-end'><strong>Room Price: $</strong></p>            
                        <p className='pr-2 flex justify-end'><strong>Tax: $</strong></p>
                        <p className='pr-2 flex justify-end'><strong>Fees: $</strong></p>
                        <p className='pr-2 flex justify-end'><strong>TOTAL: $</strong></p>
                    </CardContent>
                    <CardContent className='mt-2 pl-0 text-sm text-slate-700 mr-12'>
                        <p className='pr-2 flex justify-end'> {TotalPrice.toFixed(2)}</p>            
                        <p className='pr-2 flex justify-end'> {tax}</p>
                        <p className='pr-2 flex justify-end'> {fees}</p>
                        <p className='pr-2 flex justify-end'><strong> {total} </strong></p>
                    </CardContent>
                </div>
                <div className='flex justify-center'>
                    <Button className='w-[80%] m-4'>Pay</Button>
                </div>
            </Card>
        </>
      )}
    <Button onClick={onBack} variant='destructive' className="fixed bottom-10 left-72">
            Back
    </Button>

    </div>
  )
}
