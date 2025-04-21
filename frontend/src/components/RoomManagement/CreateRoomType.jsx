import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export const CreateRoomType = () => {
    const [formData, setFormData] = useState({
        type_name: '',
        description: '',
        bed_size: '',
        bed_qty: '',
        max_capacity: '',
        base_price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/rooms/create_room_type", formData);
            console.log('Room type created:', response.data);
            setFormData({
                type_name: '',
                description: '',
                bed_size: '',
                bed_qty: '',
                max_capacity: '',
                base_price: ''
            });
            alert('Room type created successfully!');
        } catch (error) {
            console.error('Error creating room type:', error);
            alert('Failed to create room type. Please try again.');
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Create Room Type</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="type_name" className="block text-sm font-medium text-gray-700">Room Title</label>
                    <input
                        type="text"
                        name="type_name"
                        value={formData.type_name}
                        onChange={handleChange}
                        placeholder="Enter room title"
                        className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter room description"
                        className="p-1 h-28 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bed_size" className="block text-sm font-medium text-gray-700">Bed Size</label>
                    <input
                        type="text"
                        name="bed_size"
                        value={formData.bed_size}
                        onChange={handleChange}
                        placeholder="Enter bed size"
                        className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bed_qty" className="block text-sm font-medium text-gray-700">Bed Quantity</label>
                    <input
                        type="number"
                        name="bed_qty"
                        value={formData.bed_qty}
                        onChange={handleChange}
                        placeholder="Enter bed quantity"
                        min="1"
                        className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="max_capacity" className="block text-sm font-medium text-gray-700">Max Capacity</label>
                    <input
                        type="number"
                        name="max_capacity"
                        value={formData.max_capacity}
                        onChange={handleChange}
                        placeholder="Enter max capacity"
                        min="1"
                        className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor=" base_price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="base_price"
                        value={formData.base_price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        className="p-1 mt-1 mb-10 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                        required
                    />
                </div>
                <Button type="submit" variant="default" className="w-full">
                    Create Room Type
                </Button>
            </form>
        </div>
    );
};