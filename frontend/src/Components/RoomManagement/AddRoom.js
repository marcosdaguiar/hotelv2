import React from 'react'
import axios from "axios"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'


export const AddRoom = ({setListOfRooms}) => {
    const onSubmit = async (data) => {
		try {
			// Convert string numbers to actual numbers
			const formattedData = {
				...data,
				room_id: Number(data.room_id),
				room_bed_count: Number(data.room_bed_count),
				room_price: Number(data.room_price)
			};
			
			console.log("Sending data:", formattedData); // Debug log
			const response = await axios.post(`${process.env.REACT_APP_API_URL}/rooms`, formattedData);
			console.log("Response:", response.data); // Debug log
			setListOfRooms(oldData => [...oldData, response.data]);
			alert('Room added successfully!');
		} catch (error) {
			console.error("Error adding room:", error.response?.data || error);
			alert('Failed to add room. Please try again.');
		}
	}

    const initialValues = {
        room_id: "",
        room_type: "",
        room_bed_size: "",
        room_bed_count: "",
        room_view: "",
        room_status: "",
        room_notes: "",
        room_price: "",
    };

    const validationSchema = Yup.object().shape({ 
		room_id: Yup.number().required(),
		room_type: Yup.string().required(),
		room_bed_size: Yup.string().required(),
		room_bed_count: Yup.number().required(),
		room_view: Yup.string().required(),
		room_status: Yup.string().required(),
		room_notes: Yup.string().required(),
		room_price: Yup.number().required(),
	})

   
  return (
    <div>
        <h3>Add Room</h3>
        <Formik initialValues={initialValues} onSubmit={onSubmit} >
            <Form className='addRoomBox'> 
                <div className='addRoomContent'>
                    <label>Room#:</label>      
                        <Field  type='text'
                                id='room_id'
                                name='room_id'
                                autoComplete='off'/>
                            {/*    <ErrorMessage name='room_id' component="span"/>*/}
                     
                    <label>Type: </label>
                        <Field  type='text'
                                id='room_type'
                                name='room_type'
                                autoComplete='off'/>
                     
                    <label>Beds #: </label>
                        <Field  type='text'
                                id= 'room_bed_count'
                                name= 'room_bed_count'
                                autoComplete='off' />  
                     
                    <label>Bed Size: </label>
                        <Field  type='text'
                                id= 'room_bed_size'
                                name= 'room_bed_size'
                                autoComplete='off'/>
                     
                    <label>Room View: </label>
                        <Field  type='text'
                                id= 'room_view'
                                name= 'room_view'
                                autoComplete='off'/>
                     
                    <label>Status: </label> 
                        <Field  type='text'
                                id= 'room_status'
                                name= 'room_status'
                                autoComplete='off'/>
                    
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
                                autoComplete='off'/>
                    <br></br> 
                    <button type='submit'>Add Room</button>
                </div>
            </Form>
        </Formik>
    </div>
  )
}
