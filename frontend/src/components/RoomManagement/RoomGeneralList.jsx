import React, { useState } from 'react'
import { RoomListExpand } from '@/components/RoomManagement/RoomListExpand'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"

export const RoomGeneralList = ({ listOfRooms, setListOfRooms }) => {
    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (index) => {
        setExpandedRows(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [index]
        );
    }

    return (
        <div className="w-full"> 
            <div className="flex justify-between items-center border-b border-gray-200 py- font-semibold text-sm">
                <div className="w-[100px]">Room #</div>
                <div className="w-[300px]">Room Type</div>
                <div className="w-[100px]">Bed Qty</div>
                <div className="w-[150px]">Bed Size</div>
                <div className="w-[200px]">Room View</div>
                <div className="w-[140px]">Status</div>
                <div className="w-[90px]">Notes</div>
                <div className="w-[130px]">Price</div>
            </div>
            <div className='overflow-y-scroll h-[630px]'>

            
            {listOfRooms.map((room, index) => (
                <Collapsible
                    key={index}
                    open={expandedRows.includes(index)}
                    onOpenChange={() => toggleRow(index)}
                    
                >
                    <div className="border-b border-gray-200 py-2 ">
                        <div className="flex justify-between items-center text-sm ">
                            <div className="flex-1 ">
                                <div className="flex ">
                                    <div className="w-[100px]">{room?.room_number}</div>
                                    <div className="w-[300px]">{room?.type_name}</div>
                                    <div className="w-[100px]">{room?.bed_qty}</div>
                                    <div className="w-[150px]">{room?.bed_size}</div>
                                    <div className="w-[200px]">{room?.room_view}</div>
                                    <div className="w-[140px]">{room?.room_status}</div>
                                    <div className="w-[90px]">
                                        <Checkbox
                                            checked={room?.room_notes && room?.room_notes !== "null"}
                                            disabled
                                        />
                                    </div>
                                    <div className="w-[80px]">${room?.room_base_price}</div>
                                </div>
                            </div>
                            <CollapsibleTrigger asChild>
                                {expandedRows.includes(index)
                                    ? <ChevronUp className="h-4 w-4" />
                                    : <ChevronDown className="h-4 w-4" />
                                }
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                            <Card className="mx-0 my-0 shadow-none border-0 ">
                                <CardContent className="p-4">
                                    <RoomListExpand
                                        value={room}
                                        index={index}
                                        collapse={() => toggleRow(index)}
                                        setListOfRooms={setListOfRooms}
                                        listOfRooms={listOfRooms}
                                    />
                                </CardContent>
                            </Card>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            
            ))}
            </div>
        </div>
    )
}