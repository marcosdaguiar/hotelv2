import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

export const RoomModificationExpand = (props) => {
  const value = props.value
  const index = props.index
  const collapse = props.collapse
  const setListOfRooms = props.setListOfRooms
  const allRooms = props.listOfRooms
  
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
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/room_types`);
              setRoomTypes(response.data);
          } catch (error) {
              console.error("Error fetching room types:", error);
          }
      };
      fetchRoomTypes();
  }, []);

  const deleteRoom = async (roomId, index) => {
      try {
          // First check if any rooms are using this room type
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/rooms_details`);
          const rooms = response.data;
          const roomsUsingType = rooms.filter(room => room.type_name === roomType);

          if (roomsUsingType.length > 0) {
              alert(`Cannot delete room type "${roomType}" because it is being used by ${roomsUsingType.length} room(s)`);
              return;
          }

          // If no rooms are using this type, proceed with deletion
          collapse(index);
          await axios.delete(`${process.env.REACT_APP_API_URL}/rooms/delete_room_type/${roomId}`);
          console.log("Room type deleted");
          
          // Re-render the list of rooms, removing the index of the deleted element
          setListOfRooms(allRooms.filter((_, i) => i !== index));
      } catch (error) {
          console.error("Error deleting room type:", error);
          alert('Failed to delete room type. Please try again.');
      }
  }
      
  const save = (value,index)=>{
        collapse(index)
        const selectedType = roomTypes.find(type => type.type_name === roomType);
        const newRoom = {
            id: id,
            type_name: roomType,  // This is what we use to find the record
            //room_type: roomType,  // Add this as it's what the backend expects in the where clause
            bed_size: bedSize,
            bed_qty: parseInt(bedCount),
            max_capacity: parseInt(maxCapacity),
            base_price: parseFloat(typePrice),
            description: description
        }
        
        axios.put(`${process.env.REACT_APP_API_URL}/rooms/update_room_type`, newRoom)
            .then(response => {
                console.log("Room type updated successfully:", response.data);
                // Fetch updated room data to ensure we have all fields
                axios.get(`${process.env.REACT_APP_API_URL}/rooms/room_types`)
                    .then(response => {
                        const updatedRoom = response.data.find(room => room.type_name === roomType);
                        if (updatedRoom) {
                            const updatedRooms = [...allRooms];
                            updatedRooms[index] = updatedRoom;
                            setListOfRooms(updatedRooms);
                            // Update local state to reflect changes
                            setBedSize(updatedRoom.bed_size);
                            setBedCount(updatedRoom.bed_qty);
                            setTypePrice(updatedRoom.base_price);
                            setMaxCapacity(updatedRoom.max_capacity);
                            setDescription(updatedRoom.description);
                        }
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


  const refreshList = () =>{
      
  }
  
return (
      <tr className='expandedRow' >
         <td className='exTableLabels'>                               
              <p>Type:</p>
              <p>Bed Size:</p>
              <p>Bed Qty:</p>
              <p>Max Capacity:</p>
              <p>Price:</p>
          </td>                                                                                     
          <td className= 'exTableFields' width="80px">
                  <input type='text' id='room_type' name='room_type' onChange={e=>setRoomType(e.target.value)} defaultValue={roomType} ></input><br></br>
                  <input type='text' id='bed_size' name='bed_size' onChange={e=>setBedSize(e.target.value)} value={bedSize} ></input><br></br>
                  <input type='text' id='bed_qty' name='bed_qty' onChange={e=>setBedCount(e.target.value)} value={bedCount} ></input><br></br>
                  <input type='text' id='max_capacity' name='max_capacity' onChange={e=>setMaxCapacity(e.target.value)} value={maxCapacity}></input> <br></br>
                  <input type='text' id='room_base_price' name='room_base_price' onChange={e=>setTypePrice(e.target.value)} value={typePrice} ></input><br></br>

          </td>
          <td className='exTableNotes'>       
                  <h3><u>Description</u></h3>
                  <textarea type='text' className='description' id='description' name='description' onChange={e=>setDescription(e.target.value)} defaultValue={description} />
          </td>
          <td className='exTableButtons'>
                  <button className = 'save-button' onClick={(e) =>save(value,index)}>Save</button><br></br>
                  <button className = 'delete-button'onClick={() =>deleteRoom(value.id, index)}>Delete</button><br></br>        
              </td>
      </tr>  
)
}

