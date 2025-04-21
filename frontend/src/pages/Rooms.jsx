import React from 'react'
import { RoomGeneralList } from '@/components/RoomManagement/RoomGeneralList';
import { AddRoom } from '@/components/RoomManagement/AddRoom';
import { useState, useEffect } from 'react';
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const Rooms = () => {
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    axios.get(apiUrl+"/rooms/rooms_details").then((response) => {
      console.log("Room data received:", response.data);
      setListOfRooms(response.data);
    })
  }, [])

  const [listOfRooms, setListOfRooms] = useState([]);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight]">Rooms</h1>
        <Separator />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-[78%,18%] gap-10" >
        <Card>
          <CardContent className="pl-6 pt-6 pr-0 mr-0 pb-0 mb-0 ">
            <RoomGeneralList listOfRooms={listOfRooms} setListOfRooms={setListOfRooms}/>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 ">
            <AddRoom setListOfRooms={setListOfRooms}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
