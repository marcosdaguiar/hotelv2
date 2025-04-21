import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const AddRoom = ({ setListOfRooms }) => {
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/room_types`);
                setRoomTypes(response.data.map(type => ({
                    id: type.id,
                    type_name: type.type_name,
                    bed_qty: type.bed_qty,
                    bed_size: type.bed_size,
                    base_price: type.base_price
                })));
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };
        fetchRoomTypes();
    }, []);

    const onSubmit = async (data) => {
        console.log("Form data on submit:", data); // Debugging log
        console.log("Room status on submit:", data.room_status); // Debugging log
        try {
            // Fetch existing rooms to check for duplicate room number
            const existingRoomsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/rooms_details`);
            const existingRooms = existingRoomsResponse.data;
            const roomExists = existingRooms.some(room => room.room_number === Number(data.room_number));

            if (roomExists) {
                alert('Room number already exists. Please choose a different room number.');
                return;
            }

            const selectedType = roomTypes.find(type => type.type_name === data.room_type);
            const formattedData = {
                room_number: Number(data.room_number),
                room_type_id: selectedType.id,
                room_view: data.room_view,
                status: data.room_status,
                room_notes: data.room_notes
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/rooms`, formattedData);
            const roomDetailsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/rooms_details`);
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
        room_status: "Active", // Changed to "Active"
        room_notes: "",
        room_price: "",
    };

    const validationSchema = Yup.object().shape({
        room_number: Yup.number().required("Room number is required"),
        room_type: Yup.string().required("Room type is required"),
        room_bed_size: Yup.string().required("Bed size is required"),
        room_bed_count: Yup.number().required("Number of beds is required"),
        room_view: Yup.string(),
        room_status: Yup.string().required("Status is required"),
        room_notes: Yup.string(),
        room_price: Yup.number().required("Price is required"),
    })

    return (
        <div className="p-0">
            <h3 className=" font-semibold mb-2">Add Room</h3>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ isValid, isSubmitting, submitCount, dirty }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="room_number" className="block text-sm font-medium text-gray-700">Room # *</label>
                            <Field type="text" id="room_number" name="room_number" autoComplete="off" className=" p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                        </div>
                        <div>
                            <label htmlFor="room_type" className="block text-sm font-medium text-gray-700">Type *</label>
                            <Field name="room_type">
                                {({ field, form }) => (
                                    <Select
                                        required={true}
                                        value={"Select a room type"}
                                        onValueChange={(value) => {
                                            form.setFieldValue(field.name, value);
                                            const selectedType = roomTypes.find(type => type.type_name === value);
                                            if (selectedType) {
                                                form.setFieldValue('room_bed_count', selectedType.bed_qty);
                                                form.setFieldValue('room_bed_size', selectedType.bed_size);
                                                form.setFieldValue('room_price', selectedType.base_price);
                                            }
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue>{field.value || "Select a room type"}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            
                                            {roomTypes.map((type, index) => (
                                                <SelectItem key={index} value={type.type_name}>
                                                    {type.type_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </Field>
                        </div>
                        <div>
                            <label htmlFor="room_bed_count" className="block text-sm font-medium text-gray-700">Beds #</label>
                            <Field type="text" id="room_bed_count" name="room_bed_count" disabled={true} autoComplete="off" className=" p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                        </div>
                        <div>
                            <label htmlFor="room_bed_size" className="block text-sm font-medium text-gray-700">Bed Size</label>
                            <Field type="text" id="room_bed_size" name="room_bed_size" disabled={true} autoComplete="off" className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                        </div>
                        <div>
                            <label htmlFor="room_view" className="block text-sm font-medium text-gray-700">Room View</label>
                            <Field type="text" id="room_view" name="room_view" autoComplete="off" className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                        </div>
                        <div>
                            <label htmlFor="room_status" className="block text-sm font-medium text-gray-700">Status *</label>
                            <Field name="room_status">
                                {({ field, form }) => (
                                    <Select
                                        value={field.value}
                                        required={true}
                                        onValueChange={(value) => form.setFieldValue(field.name, value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue>{field.value || "Select status"}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            </Field>
                        </div>
                        <div>
                            <label htmlFor="room_notes" className="block text-sm font-medium text-gray-700">Notes:</label>
                            <Field as="textarea" id="room_notes" name="room_notes" autoComplete="off" className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                        </div>
                        <div>
                            <label htmlFor="room_price" className="block text-sm font-medium text-gray-700">Price:</label>
                            <Field type="text" id="room_price" name="room_price" disabled={true} autoComplete="off" className="p-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                        </div>
                        {!isValid && submitCount > 0 && (
                            <div className="text-red-500 text-center text-xs">
                                Please fill in all required fields
                            </div>
                        )}
                        <Button type="submit" variant="default" className="w-full">
                            Add Room
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
