import React from 'react';
import { CreateRoomType } from '@/components/RoomManagement/CreateRoomType';
import { useState, useEffect } from 'react';
import axios from "axios"
import { RoomTypeList } from '@/components/RoomManagement/RoomTypeList';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export const RoomTypes = () => {
  const [listOfRooms, setListOfRooms] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    axios.get(apiUrl+"/rooms/room_types").then((response) => {
      console.log(response.data);
      setListOfRooms(response.data);
    })
  },[])

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight]">Rooms Types</h1>
        <Separator />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-[78%,18%] gap-10">
        <Card className="border-none shadow-none">
          <CardContent className="p-4 h-[720px] overflow-y-auto over bg-slate-200 ">
            <RoomTypeList 
              listOfRooms={listOfRooms} 
              setListOfRooms={setListOfRooms} 
              setIsDialogOpen={setIsDialogOpen}
              handleDialogClose={handleDialogClose}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 ">
            <CreateRoomType setListOfRooms={setListOfRooms}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
