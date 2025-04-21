import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export const RoomModificationExpand = (props) => {
    const value = props.value
    const index = props.index
    const setListOfRooms = props.setListOfRooms
    const allRooms = props.listOfRooms
    const handleDialogClose = props.handleDialogClose

    const id = useState(value.id);
    const [roomType, setRoomType] = useState(value.type_name);
    const [bedSize, setBedSize] = useState(value.bed_size);
    const [bedCount, setBedCount] = useState(value.bed_qty);
    const [typePrice, setTypePrice] = useState(value.base_price);
    const [maxCapacity, setMaxCapacity] = useState(value.max_capacity);
    const [description, setDescription] = useState(value.description);
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/room_types`);
                setRoomTypes(response.data);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };
        fetchRoomTypes();
    }, []);

    const deleteRoom = async (roomId, index) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/rooms_details`);
            const rooms = response.data;
            const roomsUsingType = rooms.filter(room => room.type_name === roomType);

            if (roomsUsingType.length > 0) {
                alert(`Cannot delete room type "${roomType}" because it is being used by ${roomsUsingType.length} room(s)`);
                return;
            }

            await axios.delete(`${import.meta.env.VITE_API_URL}/rooms/delete_room_type/${roomId}`);
            console.log("Room type deleted");

            setListOfRooms(allRooms.filter((_, i) => i !== index));
            handleDialogClose();
        } catch (error) {
            console.error("Error deleting room type:", error);
            alert('Failed to delete room type. Please try again.');
        }
    }

    const save = (roomId, index) => {
        
        const newRoom = {
            id: roomId,
            type_name: roomType,
            bed_size: bedSize,
            bed_qty: parseInt(bedCount),
            max_capacity: parseInt(maxCapacity),
            base_price: parseFloat(typePrice),
            description: description
        }

        axios.put(`${import.meta.env.VITE_API_URL}/rooms/update_room_type`, newRoom)
            .then(response => {
                console.log("Room type updated successfully save function:", response.data);
                axios.get(`${import.meta.env.VITE_API_URL}/rooms/room_types`)
                    .then(response => {
                        const updatedRoom = response.data.find(room => room.type_name === roomType);
                        
                        if (updatedRoom) {
                            const updatedRooms = [...allRooms];
                            updatedRooms[index] = updatedRoom;
                            setListOfRooms(updatedRooms);
                            setBedSize(updatedRoom.bed_size);
                            setBedCount(updatedRoom.bed_qty);
                            setTypePrice(updatedRoom.base_price);
                            setMaxCapacity(updatedRoom.max_capacity);
                            setDescription(updatedRoom.description);
                        }
                        handleDialogClose(); // Move this inside the .then block
                    })
                    .catch(error => {
                        console.error("Error fetching updated room types:", error);
                    });
            })
            .catch(error => {
                console.error("Error updating room type:", error);
                alert('Failed to update room type. Please try again.');
            });
    }

    return (
        <div className="space-y-4 w-[280px]" >
            <div>
                <label htmlFor="room_type" className="block text-sm font-medium text-gray-700">Type</label>
                <input type="text" id="room_type" name="room_type" onChange={e => setRoomType(e.target.value)} value={roomType} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
            </div>
            <div>
                <label htmlFor="bed_size" className="block text-sm font-medium text-gray-700">Bed Size</label>
                <input type="text" id="bed_size" name="bed_size" onChange={e => setBedSize(e.target.value)} value={bedSize} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
            </div>
            <div>
                <label htmlFor="bed_qty" className="block text-sm font-medium text-gray-700">Bed Qty</label>
                <input type="number" id="bed_qty" name="bed_qty" onChange={e => setBedCount(e.target.value)} value={bedCount} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
            </div>
            <div>
                <label htmlFor="max_capacity" className="block text-sm font-medium text-gray-700">Max Capacity</label>
                <input type="number" id="max_capacity" name="max_capacity" onChange={e => setMaxCapacity(e.target.value)} value={maxCapacity} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
            </div>
            <div>
                <label htmlFor="room_base_price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" id="room_base_price" name="room_base_price" onChange={e => setTypePrice(e.target.value)} value={typePrice} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" onChange={e => setDescription(e.target.value)} value={description} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
            </div>
            <div className="flex justify-end space-x-2">
                <Button variant="default" onClick={() => save(value.id, index)}>Save</Button>
                <Button variant="destructive" onClick={() => deleteRoom(value.id, index)}>Delete</Button>
            </div>
        </div>
    )
}

