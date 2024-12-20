import React from 'react'
import { RoomGeneralList } from '../Components/RoomManagement/RoomGeneralList';
import { AddRoom } from '../Components/RoomManagement/AddRoom';
import { useState, useEffect } from 'react';
import axios from "axios"
import '../Styles/Rooms.css';

export const Rooms = () => {

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL
    axios.get(apiUrl+"/rooms/rooms_details").then((response) => {
      console.log("Room data received:", response.data); // Add this line
      setListOfRooms(response.data);
    })
}, [])

  const [listOfRooms, setListOfRooms] = useState([]);



  return (
    <div>
      <header className = "header">
        <h1>Rooms</h1>
        <hr></hr>
      </header>
      <div className="settings-container">        
        <RoomGeneralList listOfRooms={listOfRooms} setListOfRooms={setListOfRooms}/>
        <AddRoom setListOfRooms={setListOfRooms}/>

      </div>
    </div>
  )
}
