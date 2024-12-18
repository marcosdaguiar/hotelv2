import React from 'react';
import '../../Styles/BookingTimeline.css';

export const BookingTimeline = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Room Search' },
    { number: 2, title: 'Personal Information' },
    { number: 3, title: 'Payment' }
  ];

  return (
    <div className="timeline-container">
      {steps.map((step, index) => (
        <div key={step.number} className={`timeline-step ${currentStep >= step.number ? 'active' : ''}`}>
          <div className="step-number">{step.number}</div>
          <div className="step-title">{step.title}</div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </div>
      ))}
    </div>
  );
};