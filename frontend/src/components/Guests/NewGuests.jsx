import React from 'react';

export const NewGuests = ({ formData, handleChange, handlePhoneChange, errors }) => {
  return (
    <div className="personal-info-form">
      <h2 className="mt-10 mb-10 text-lg font-medium">Personal Information</h2>
      <form className="flex-1 md:grid-cols-3 gap-4 grid w-[1000px]">
        <div className="form-group">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            autoComplete='off'
            value={formData.firstName || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.firstName && <span className="error text-red-500 text-sm">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            autoComplete='off'
            value={formData.lastName || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.lastName && <span className="error text-red-500 text-sm">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete='off'
            value={formData.email || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <span className="error text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            maxLength={12}
            placeholder="123-456-7890"
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.phone && <span className="error text-red-500 text-sm">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="address"
            id="address"
            name="address"
            autoComplete='off'
            value={formData.address || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.address && <span className="error text-red-500 text-sm">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="apt" className="block text-sm font-medium text-gray-700">Apartment, suite, etc.</label>
          <input
            type="apt"
            id="apt"
            name="apt"
            autoComplete='off'
            value={formData.apt || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="city"
            id="city"
            name="city"
            autoComplete='off'
            value={formData.city || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.city && <span className="error text-red-500 text-sm">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="state"
            id="state"
            name="state"
            autoComplete='off'
            value={formData.state || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.state && <span className="error text-red-500 text-sm">{errors.state}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip/postal code</label>
          <input
            type="zip"
            id="zip"
            name="zip"
            autoComplete='off'
            value={formData.zip || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.zip && <span className="error text-red-500 text-sm">{errors.zip}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="country"
            id="country"
            name="country"
            autoComplete='off'
            value={formData.country || ''}
            onChange={handleChange}
            required
            className="p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.country && <span className="error text-red-500 text-sm">{errors.country}</span>}
        </div>
      </form>
      <div className="button-group mt-4 flex justify-between">
      </div>
    </div>
  );
};
