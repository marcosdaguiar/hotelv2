import React from 'react'
import { useState } from 'react';
import { RoomListExpand } from './RoomListExpand';
import '../../Styles/Rooms.css';


export const RoomGeneralList = ({listOfRooms, setListOfRooms}) => {

      const [expandedRows, setExpandedRows] = useState([]);
      const [openClose, setOpenClose]= useState(false);
      let oldindex

      const toggleRow = (index) => {

        const newExpandedRows = [...expandedRows];
        if (newExpandedRows.includes(index)) {
           newExpandedRows.splice(newExpandedRows.indexOf(index), 1);
           setOpenClose(false);
             oldindex=index
        } 
        else if(openClose){
            newExpandedRows.splice(newExpandedRows.indexOf(oldindex), 1);
            newExpandedRows.push(index);        
        }
        else{
            newExpandedRows.push(index)
            setOpenClose(true)
        }
        setExpandedRows(newExpandedRows);
    }
//▲
    const notesValidator = (notes) =>{       
        if((!notes)||(notes==="null")){
            return false;
        }
        else{
            return true;
        }
    }

  return (
    <div className='table-wrap'>                
        <h3>Current Rooms</h3>
        <table className='rooms-table'>
            <thead>
                <tr>              
                    <th width="100px">Room #</th>
                    <th width="140px">Type</th>
                    <th width="100px">Beds #</th>
                    <th width="100px">Bed Size</th>
                    <th width="140px">Room View</th>
                    <th width="140px">Status</th>
                    <th width="100px">Notes</th>
                    <th width="100px">Price</th>
                </tr>
            </thead>
            <tbody>
                {listOfRooms.map((value, index) => (
                    <React.Fragment key = {index}>
                        <tr>
                            <td width="100px">{value?.room_number}</td>
                            <td width="140px">{value?.type_name}</td>
                            <td width="100px">{value?.bed_qty}</td>
                            <td width="100px">{value?.bed_size}</td>
                            <td width="140px">{value?.room_view}</td>
                            <td width="140px">{value?.room_status}</td>
                            <td width="100px">
                                <input type='checkbox' id= "checkbox1" checked={notesValidator(value?.room_notes)} readOnly></input>
                            </td>
                            <td width="80px">${value?.room_base_price}</td>
                            <td>                         
                                <h3 id='roomDetailButton' onClick={() => toggleRow(index)}>
                                    {expandedRows.includes(index) ? '[ ̶̶̶  ]' : '[+]'}</h3>
                            </td>
                        </tr>
                        {expandedRows.includes(index) &&(
                            <RoomListExpand
                            value={listOfRooms[index]}
                            index = {index} 
                            collapse = {toggleRow}
                            setListOfRooms = {setListOfRooms}
                            listOfRooms = {listOfRooms} 
                        />
                        )}                                   
                    </React.Fragment>                   
                ))}     
            </tbody>          
        </table>       
    </div>
  )
}
