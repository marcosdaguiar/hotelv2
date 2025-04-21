import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"


import { Card, CardContent } from "@/components/ui/card"

export const GuestsList = ({ listOfGuests, setListOfGuests }) => {
    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (index) => {
        setExpandedRows(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [index]
        );
    }

    return (
        <div className="guests_table w-full"> 
            <div className="flex border-b border-gray-200 py- font-semibold text-sm">
                <div className="w-[150px]">First</div>
                <div className="w-[150px]">Last</div>
                <div className="w-[250px]">Email</div>
                <div className="w-[150px]">Phone</div>
                <div className="w-[250px]">Address</div>
                <div className="w-[100px]">Apt/suite</div>
                <div className="w-[120px]">City</div>
                <div className="w-[100px]">State</div>
                <div className="w-[100px]">Postal</div>
                <div className="w-[100px]">Country</div>
            </div>
            <div className='overflow-y-scroll h-[630px]'>

            
            {listOfGuests.map((guest, index) => (
                <Collapsible
                    key={index}
                    open={expandedRows.includes(index)}
                    onOpenChange={() => toggleRow(index)}
                    
                >
                    <div className="border-b border-gray-200 py-2 ">
                        <div className="flex text-sm ">
                            <div className="flex-1 ">
                                <div className="flex ">
                                    <div className="w-[150px]">{guest?.first_name}</div>
                                    <div className="w-[150px]">{guest?.last_name}</div>
                                    <div className="w-[250px]">{guest?.email}</div>
                                    <div className="w-[150px]">{guest?.phone_number}</div>
                                    <div className="w-[250px]">{guest?.address}</div>
                                    <div className="w-[100px]">{guest?.apt}</div>
                                    <div className="w-[120px]">{guest?.city}</div>
                                    <div className="w-[100px]">{guest?.state}</div>
                                    <div className="w-[100px]">{guest?.postal_code}</div>
                                    <div className="w-[120px]">{guest?.country}</div>
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
                                {/* <CardContent className="p-4">
                                    <RoomListExpand
                                        value={room}
                                        index={index}
                                        collapse={() => toggleRow(index)}
                                        setListOfRooms={setListOfRooms}
                                        listOfRooms={listOfRooms}
                                    />
                                </CardContent> */}
                            </Card>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            
            ))}
            </div>
        </div>
    )
}