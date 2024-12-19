import React, { useState, useEffect } from 'react'
import axios from "axios"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'


export const AddRoom = ({setListOfRooms}) => {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/room_types`);
                // Store both id and type_name from room_types
                setRoomTypes(response.data.map(type => ({
                    id: type.id,
                    type_name: type.type_name,
                    bed_qty: type.bed_qty,
                    bed_size: type.bed_size,
                    base_price: type.base_price
                })));
                setRoomTypes(response.data);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };
        fetchRoomTypes();
    }, []);

    const onSubmit = async (data) => {
		try {
			// Find the selected room type to get its ID
			const selectedType = roomTypes.find(type => type.type_name === data.room_type);
			
			// Format the data according to the database model
			const formattedData = {
				room_number: Number(data.room_number),
				room_type_id: selectedType.id,
				room_view: data.room_view,
				status: data.room_status,
				room_notes: data.room_notes
			};
			
			console.log("Sending data:", formattedData); // Debug log
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/rooms`, formattedData);
			console.log("Response:", response.data); // Debug log
			
			// Fetch the complete room details after creation
			const roomDetailsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/rooms_details`);
			const newRoom = roomDetailsResponse.data.find(room => room.room_number === formattedData.room_number);
			
			if (newRoom) {
				setListOfRooms(oldData => [...oldData, newRoom]);
				alert('Room added successfully!');
			}
		} catch (error) {
			console.error("Error adding room:", error.response?.data || error);
			alert('Failed to add room. Please try again.');
		}
	}

    const initialValues = {
        room_number: "",
        room_type: "",
        room_bed_size: "",
        room_bed_count: "",
        room_view: "",
        room_status: "active", // Set default value
        room_notes: "",
        room_price: "",
    };

    const validationSchema = Yup.object().shape({ 
        room_number: Yup.number().required("Room number is required"),
        room_type: Yup.string().required("Room type is required"),
        room_bed_size: Yup.string().required("Bed size is required"),
        room_bed_count: Yup.number().required("Number of beds is required"),
        room_view: Yup.string().required("Room view is required"),
        room_status: Yup.string().required("Status is required"),
        room_notes: Yup.string().required("Notes are required"),
        room_price: Yup.number().required("Price is required"),
    })

   
  return (
    <div>
        <h3>Add Room</h3>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isValid, isSubmitting, submitCount, dirty }) => (
                <Form className='addRoomBox'> 
                <div className='addRoomContent'>
                    <label>Room#:</label>      
                        <Field  type='text'
                                id='room_number'
                                name='room_number'
                                autoComplete='off'/>
                            {/*    <ErrorMessage name='room_id' component="span"/>*/}
                     
                    <label>Type: </label>
                        <Field name="room_type">
                            {({ field, form }) => (
                                <select
                                    {...field}
                                    id='room_type'
                                    autoComplete='off'
                                    onChange={(e) => {
                                        field.onChange(e);
                                        const selectedType = roomTypes.find(type => type.type_name === e.target.value);
                                        if (selectedType) {
                                            form.setFieldValue('room_bed_count', selectedType.bed_qty);
                                            form.setFieldValue('room_bed_size', selectedType.bed_size);
                                            form.setFieldValue('room_price', selectedType.base_price);
                                        }
                                    }}>
                                    <option value="">Select a room type</option>
                                    {roomTypes.map((type, index) => (
                                        <option key={index} value={type.type_name}>
                                            {type.type_name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </Field>

                     
                    <label>Beds #: </label>
                        <Field  type='text'
                                id= 'room_bed_count'
                                name= 'room_bed_count'
                                disabled={true}
                                autoComplete='off' />  
                     
                    <label>Bed Size: </label>
                        <Field  type='text'
                                id= 'room_bed_size'
                                name= 'room_bed_size'
                                disabled={true}
                                autoComplete='off'/>
                     
                    <label>Room View: </label>
                        <Field  type='text'
                                id= 'room_view'
                                name= 'room_view'
                                autoComplete='off'/>
                     
                    <label>Status: </label> 
                        <Field as="select"
                               id='room_status'
                               name='room_status'
                               autoComplete='off'>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Field>
                    
                    <label>Notes: </label>
                        <Field  as="textarea"   
                                type='text'
                                id= 'room_notes'
                                name='room_notes'
                                autoComplete='off'/>
                     
                    <label>Price: </label>
                        <Field  type='text'
                                id= 'room_price'
                                name= 'room_price'
                                disabled={true}
                                autoComplete='off'/>
                    <br></br>
                    {!isValid && submitCount > 0 && (
                        <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                            Please fill in all required fields before submitting
                        </div>
                    )}
                    <button type='submit' disabled={!isValid || isSubmitting || !dirty}>Add Room</button>
                </div>
            </Form>
            )}
        </Formik>
    </div>
  )
}
