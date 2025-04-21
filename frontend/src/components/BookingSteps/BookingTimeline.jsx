import React from 'react';
import { Progress } from '@/components/ui/progress';

export const BookingTimeline = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Room Search' },
    { number: 2, title: 'Personal Information' },
    { number: 3, title: 'Booking Summary' }, 
    { number: 4, title: 'Payment' }
    
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="timeline-container p-2 ">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className={`timeline-step text-center ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'} flex-1`}>
            <div className="step-number text-xl font-bold mb-2">{step.number}</div>
            <div className="step-title text-sm">{step.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};