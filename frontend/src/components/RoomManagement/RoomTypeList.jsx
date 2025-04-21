import React, { useState } from 'react'
import { RoomModificationExpand } from './RoomModificationExpand';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../ui/dialog';

export const RoomTypeList = ({ listOfRooms, setListOfRooms }) => {
    const [openDialogIndex, setOpenDialogIndex] = useState(null);

    const handleDialogClose = () => {
        setOpenDialogIndex(null);
    };

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {listOfRooms.map((value, index) => (
                <Card key={index} className="shadow-md h-80 bg-gray-100">
                    <div className="border-b border-gray-200 p-2 h-72 flex-row-"> 
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex-1">
                                <div className="flex flex-col">
                                    <div className="w-full text-base font-semibold mb-2">{value.type_name}</div>
                                    <div className="w-full">Bed Qty: {value.bed_qty}</div>
                                    <div className="w-full">Bed Size: {value.bed_size}</div>
                                    <div className="w-full">Max Capacity: {value.max_capacity}</div>
                                    <div className="w-full">Price: ${value.base_price}</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[100px] text-sm italic align-text-bottom h-14">
                            {value.description.length > 100
                                ? `${value.description.substring(0, 100)}...`
                                : value.description}
                        </div>							
                        <Dialog open={openDialogIndex === index} onOpenChange={(isOpen) => setOpenDialogIndex(isOpen ? index : null)}>
                            <DialogTrigger asChild>
                                <Button variant="default" className="h-6 mt-4">Edit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[400px] h-[550px]">
                                <DialogTitle>Edit Room Type</DialogTitle>
                                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <RoomModificationExpand 
                                        value={value} 
                                        index={index} 
                                        setListOfRooms={setListOfRooms} 
                                        listOfRooms={listOfRooms} 
                                        handleDialogClose={handleDialogClose}
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
            ))}
        </div>
    )
}
