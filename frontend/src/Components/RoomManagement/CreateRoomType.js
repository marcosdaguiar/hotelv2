import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/RoomSearch.css';
import '../../Styles/RoomSettings.css'

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
			const response = await axios.post(process.env.REACT_APP_API_URL+"/rooms/create_room_type", formData);
			console.log('Room type created:', response.data);
			// Clear form after successful submission
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
		<div className="booking-step">
			<h2>Create Room Type</h2>
			<form className="search-form" onSubmit={handleSubmit}>
				<div className="form-row">
					<div className="form-group">
						<label>Room Title</label>
						<input
							type="text"
							name="type_name"
							value={formData.type_name}
							onChange={handleChange}
							placeholder="Enter room title"
						/>
					</div>
					<div className="form-group">
						<label>Description</label>
						<input
							type="text"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Enter bed size"
						/>
					</div>
					<div className="form-group">
						<label>Bed Size</label>
						<input
							type="text"
							name="bed_size"
							value={formData.bed_size}
							onChange={handleChange}
							placeholder="Enter bed size"
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label>Bed Quantity</label>
						<input
							type="number"
							name="bed_qty"
							value={formData.bed_qty}
							onChange={handleChange}
							placeholder="Enter bed quantity"
							min="1"
						/>
					</div>
					<div className="form-group">
						<label>Max Capacity</label>
						<input
							type="number"
							name="max_capacity"
							value={formData.max_capacity}
							onChange={handleChange}
							placeholder="Enter bed quantity"
							min="1"
						/>
					</div>
					<div className="form-group">
						<label>Price</label>
						<input
							type="number"
							name="base_price"
							value={formData.base_price}
							onChange={handleChange}
							placeholder="Enter price"
							min="0"
							step="0.01"
						/>
					</div>
				</div>
				<button type="submit" className="next-button">
					Create Room Type
				</button>
			</form>
		</div>
	);
};