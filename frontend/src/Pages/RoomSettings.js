import React from 'react';
import { CreateRoomType } from '../Components/RoomManagement/CreateRoomType';
import { useState, useEffect } from 'react';
import axios from "axios"
import { RoomTypeList } from '../Components/RoomManagement/RoomTypeList';
import '../Styles/RoomSettings.css'

export const RoomSettings = () => {

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL
    axios.get(apiUrl+"/rooms/room_types").then((response) => {
      console.log(response.data);
      setListOfRooms(response.data);
    })
  },[])

  const [listOfRooms, setListOfRooms] = useState([]);

  return (
    <div>
      <header className="header">
        <h1>Room Settings</h1>
        <hr></hr>
      </header>
      <div className="settings-container">
        <RoomTypeList listOfRooms={listOfRooms} setListOfRooms={setListOfRooms}/>
        <CreateRoomType />
      </div>
    </div>
    
  );
};