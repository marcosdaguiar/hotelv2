import React, { useState } from 'react';

export const Payment = ({ onBack, onComplete, selectedRoom }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!paymentDetails.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!paymentDetails.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentDetails.cvv) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = () => {
    if (validateForm()) {
      onComplete();
    }
  };

  return (
    <div className="booking-step">
      <h2>Payment Details</h2>
      <div className="price-summary">
        <h3>Booking Summary</h3>
        <p>Room Price: ${selectedRoom?.room_price}</p>
        {/* Add more summary details as needed */}
      </div>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
          />
          {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
          />
          {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleChange}
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
      </form>
      <div className="button-group">
        <button onClick={onBack}>Back</button>
        <button onClick={handleComplete}>Complete Booking</button>
      </div>
    </div>
  );
};