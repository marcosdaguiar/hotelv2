import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'



export const RoomListExpand = (props) => {
    const value = props.value
    const index = props.index
    const collapse = props.collapse
    const setListOfRooms = props.setListOfRooms
    const allRooms = props.listOfRooms

    const [roomNum, setRoomNum] = useState(value.roomNum);
    const [roomType, setRoomType] = useState(value.roomName);
    const [roomView, setRoomView] = useState(value.roomView);
    const [roomStatus, setRoomStatus] = useState(value.roomStatus);
    const [roomNotes, setRoomNotes] = useState(value.roomNotes);

    const deleteRoom = (roomId, index) =>{
        collapse(index);

        axios.delete(process.env.REACT_APP_API_URL+'/rooms/'+ roomId).then(response =>{
            console.log("room deleted");        
        })
        
        //re render the list of rooms, removing the index of the deleted element
        setListOfRooms(allRooms.filter((_, i)=> i !== index))
        }
        
    const save = (value,index)=>{
        collapse(index)
        const newRoom = {
            id: value.id,
            room_id: roomNum,
            room_type: roomType,
            //room_bed_size: bedSize,
           // room_bed_count: bedCount,
            room_view: roomView,
            room_status: roomStatus,
            room_notes: roomNotes,
           // room_price: roomPrice,
        }
        axios.put(process.env.REACT_APP_API_URL+'/rooms/update', newRoom);

        console.log(newRoom)   

        allRooms[index] = newRoom; 
        setListOfRooms(allRooms);
    }

    const refreshList = () =>{
        
    }
    
  return (
        <tr className='expandedRow' >
           <td className='exTableLabels'>                               
                <p>Room #:</p>
                <p>Type:</p>
                <p>Room View:</p>
                <p>Status:</p>
            </td>                                                                                     
            <td className= 'exTableFields' width="80px">
                    <input type='text' id='room_id' name='room_id' onChange={e=>setRoomNum(e.target.value)} defaultValue={roomNum} readOnly ></input><br></br>
                    <input type='text' id='room_type' name='room_type' onChange={e=>setRoomType(e.target.value)} defaultValue={roomType} ></input><br></br>
                    <input type='text' id='room_view' name='room_view' onChange={e=>setRoomView(e.target.value)} defaultValue={roomView}></input> <br></br>
                    <input type='text' id='room_status' name='room_status' onChange={e=>setRoomStatus(e.target.value)} defaultValue={roomStatus}></input><br></br>
            </td>
            <td className='exTableNotes'>       
                    <h3><u>Notes</u></h3>
                    <textarea type='text' className='roomNotes' id='room_notes' name='room_notes' onChange={e=>setRoomNotes(e.target.value)} defaultValue={roomNotes} />
            </td>
            <td className='exTableButtons'>
                    <button onClick={(e) =>save(value,index)}>Save</button><br></br>
                    <button onClick={() =>deleteRoom(value.room_id, index)}>Delete</button><br></br>
            </td>           
        </tr>  
  )
}
