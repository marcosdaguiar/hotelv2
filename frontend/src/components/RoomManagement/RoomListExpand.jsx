import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"


export const RoomListExpand = (props) => {
    const value = props.value
    const index = props.index
    const collapse = props.collapse
    const setListOfRooms = props.setListOfRooms
    const allRooms = props.listOfRooms

    const [roomNum, setRoomNum] = useState(value.room_number);
    const [roomType, setRoomType] = useState(value.type_name);
    const [roomView, setRoomView] = useState(value.room_view);
    const [bedSize, setBedSize] = useState(value.bed_size);
    const [bedCount, setBedCount] = useState(value.bed_qty);
    const [roomPrice, setRoomPrice] = useState(value.room_base_price);
    const [roomStatus, setRoomStatus] = useState(value.room_status);
    const [roomNotes, setRoomNotes] = useState(value.room_notes);
    const [roomNums, setRoomNums] = useState([]);

    useEffect(() => {
        const fetchroomNums = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/room_types`);
                setRoomNums(response.data);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };
        fetchroomNums();
    }, []);

    const deleteRoom = (roomNum, index) =>{
        collapse(index);

        axios.delete(import.meta.env.VITE_API_URL+'/rooms/'+ roomNum).then(response =>{
            console.log("room deleted");        
        })
        
        //re render the list of rooms, removing the index of the deleted element
        setListOfRooms(allRooms.filter((_, i)=> i !== index))
        }
        
    const save = async (value, index) => {
        try {
            collapse(index);
            const selectedType = roomNums.find(type => type.type_name === roomType);
            
            // Create update data with all fields
            const updateData = {
                room_number: parseInt(roomNum),
                room_type_id: selectedType ? selectedType.id : null,
                room_view: roomView,
                status: roomStatus,
                room_notes: roomNotes
            };
            
            console.log("Sending update data:", updateData);
            
            // Update the room
            await axios.put(`${import.meta.env.VITE_API_URL}/rooms/update`, updateData);
            
            // Fetch the updated room details
            const roomDetailsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/rooms_details`);
            const updatedRoom = roomDetailsResponse.data.find(room => room.room_number === parseInt(roomNum));
            
            if (updatedRoom) {
                // Update the local state with the new room data
                const updatedRooms = allRooms.map(room => 
                    room.room_number === parseInt(roomNum) ? updatedRoom : room
                );
                setListOfRooms(updatedRooms);
                console.log("Room updated successfully:", updatedRoom);
            } else {
                throw new Error("Failed to find updated room");
            }
        } catch (error) {
            console.error("Error updating room:", error);
            alert('Failed to update room. Please try again.');
        }
    }


    const refreshList = () =>{
        
    }
    
return (

        
            <Card className="mx-0 my-0 shadow-none border-0 m-0 p-0 bg-transparent" >
                <CardContent className="grid grid-cols-4 gap-4 p-4 bg-gray-100 border-spacing-0 m-0 ">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="room_id">Room Number</Label>
                            <Input 
                                id="room_id" 
                                name="room_number" 
                                value={roomNum} 
                                disabled={true} 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="room_type">Room Type</Label>
                            <Select 
                                value={roomType}
                                onValueChange={(value) => {
                                    setRoomType(value);
                                    const selectedType = roomNums.find(type => type.type_name === value);
                                    if (selectedType) {
                                        setBedSize(selectedType.bed_size);
                                        setBedCount(selectedType.bed_qty);
                                        setRoomPrice(selectedType.base_price);
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roomNums.map((type, index) => (
                                        <SelectItem key={index} value={type.type_name}>
                                            {type.type_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bed_size">Bed Size</Label>
                            <Input 
                                id="bed_size" 
                                name="bed_size" 
                                value={bedSize} 
                                disabled={true} 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bed_qty">Bed Quantity</Label>
                            <Input 
                                id="bed_qty" 
                                name="bed_qty" 
                                value={bedCount} 
                                disabled={true} 
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="room_view">Room View</Label>
                            <Input 
                                id="room_view" 
                                name="room_view" 
                                value={roomView}
                                onChange={e => setRoomView(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={roomStatus} onValueChange={setRoomStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="room_base_price">Price</Label>
                            <Input 
                                id="room_base_price" 
                                name="room_base_price" 
                                value={roomPrice} 
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="room_notes">Notes</Label>
                            <Textarea
                                id="room_notes"
                                name="room_notes"
                                value={roomNotes}
                                onChange={e => setRoomNotes(e.target.value)}
                                className="min-h-[150px]"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={(e) => save(value, index)} className="flex-1"
                                variant="default"
                                >
                                Save
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="flex-1">
                                        Delete
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete the room with room number {roomNum}?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteRoom(value.room_number, index)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </CardContent>
            </Card>

)
}
