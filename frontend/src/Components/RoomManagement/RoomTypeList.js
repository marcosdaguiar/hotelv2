import React from 'react'
import { useState } from 'react';
import { RoomModificationExpand } from './RoomModificationExpand';
import { CreateRoomType } from './CreateRoomType';

export const RoomTypeList = ({listOfRooms, setListOfRooms}) => {
	const [expandedRows, setExpandedRows] = useState([]);
	const [openClose, setOpenClose]= useState(false);
	let oldindex;

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
	
	return (
		<div>
				<div className='table-wrap' >                
					<table className='roomConfigList'>
						<thead>
							<tr> 
                                <th width="50px">Id</th>             
								<th width="350px">Name</th>
								<th width="100px">Beds #</th>
								<th width="100px">Bed Size</th>
								<th width="100px">Max Capacity</th>
								<th width="100px">Price</th>
							</tr>
						</thead>
						<tbody>
							{listOfRooms.map((value, index) => (
								<React.Fragment key={index}>
									<tr>
                                        <td width="50px">{value.room_type_id}</td>
										<td width="350px">{value.type_name}</td>
										<td width="100px">{value.bed_qty}</td>
										<td width="100px">{value.bed_size}</td>
										<td width="100px">{value.max_capacity}</td>
										<td width="100px">${value.base_price}</td>
										<td>                         
											<h3 id='roomDetailButton' onClick={() => toggleRow(index)}>
												{expandedRows.includes(index) ? '[ ̶̶̶  ]' : '[+]'}</h3>
										</td>
									</tr>
									{expandedRows.includes(index)}                                   
								</React.Fragment>                   
							))}     
						</tbody>          
					</table>       
				</div>
		</div>
  )
}
