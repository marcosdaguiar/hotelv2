import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'



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
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/room_types`);
                setRoomTypes(response.data);
            } catch (error) {
                console.error("Error fetching room types:", error);
            }
        };
        fetchRoomTypes();
    }, []);

    const deleteRoom = (roomId, index) =>{
        collapse(index);

        axios.delete(process.env.REACT_APP_API_URL+'/rooms/'+ roomNum).then(response =>{
            console.log("room deleted");        
        })
        
        //re render the list of rooms, removing the index of the deleted element
        setListOfRooms(allRooms.filter((_, i)=> i !== index))
        }
        
    const save = (value,index)=>{
        collapse(index)
        const selectedType = roomTypes.find(type => type.type_name === roomType);
        const newRoom = {
            room_number: roomNum,
            room_type_id: selectedType ? selectedType.id : null,
            room_view: roomView,
            room_status: roomStatus,
            room_notes: roomNotes
        }
        
        axios.put(`${process.env.REACT_APP_API_URL}/rooms/update`, newRoom)
            .then(response => {
                console.log("Room updated successfully:", response.data);
                // Fetch updated room data to ensure we have all fields
                axios.get(`${process.env.REACT_APP_API_URL}/rooms/rooms_details`)
                    .then(response => {
                        const updatedRoom = response.data.find(room => room.room_number === roomNum);
                        if (updatedRoom) {
                            const updatedRooms = [...allRooms];
                            updatedRooms[index] = updatedRoom;
                            setListOfRooms(updatedRooms);
                        }
                    });
            })
            .catch(error => {
                console.error("Error updating room:", error);
                alert('Failed to update room. Please try again.');
            });
    }


    const refreshList = () =>{
        
    }
    
  return (
        <tr className='expandedRow' >
           <td className='exTableLabels'>                               
                <p>Room #:</p>
                <p>Type:</p>
                <p>Bed Type:</p>
                <p>Bed Qty:</p>
                <p>Room View:</p>
                <p>Status:</p>
                <p>Price:</p>
            </td>                                                                                     
            <td className= 'exTableFields' width="80px">
                    <input type='text' id='room_id' name='room_number' onChange={e=>setRoomNum(e.target.value)} defaultValue={roomNum} readOnly ></input><br></br>
                    <select 
                        id='room_type' 
                        name='room_type' 
                        value={roomType}
                        onChange={(e) => {
                            setRoomType(e.target.value);
                            const selectedType = roomTypes.find(type => type.type_name === e.target.value);
                            console.log('Selected type:', selectedType);
                            console.log('Room types:', roomTypes);
                            if (selectedType) {
                                setBedSize(selectedType.bed_size);
                                setBedCount(selectedType.bed_qty);
                                setRoomPrice(selectedType.base_price);
                            }
                        }}>
                        <option value="">Select a room type</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type.type_name}>
                                {type.type_name}
                            </option>
                        ))}
                    </select><br></br>
                    <input type='text' id='bed_size' name='bed_size' value={bedSize} disabled={true}></input><br></br>
                    <input type='text' id='bed_qty' name='bed_qty' value={bedCount} disabled={true}></input><br></br>
                    <input type='text' id='room_view' name='room_view' onChange={e=>setRoomView(e.target.value)} value={roomView}></input> <br></br>
                    <input type='text' id='room_status' name='room_status' onChange={e=>setRoomStatus(e.target.value)} value={roomStatus}></input><br></br>
                    <input type='text' id='room_base_price' name='room_base_price' value={roomPrice} disabled={true}></input><br></br>

            </td>
            <td className='exTableNotes'>       
                    <h3><u>Notes</u></h3>
                    <textarea type='text' className='roomNotes' id='room_notes' name='room_notes' onChange={e=>setRoomNotes(e.target.value)} defaultValue={roomNotes} />
            </td>
            <td className='exTableButtons'>
                    <button onClick={(e) =>save(value,index)}>Save</button><br></br>
                    <button onClick={() =>deleteRoom(value.room_number, index)}>Delete</button><br></br>
            </td>           
        </tr>  
  )
}
