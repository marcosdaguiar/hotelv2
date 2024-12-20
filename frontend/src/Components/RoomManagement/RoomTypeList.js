import React from 'react'
import { useState } from 'react';
import { RoomModificationExpand } from './RoomModificationExpand';
import { CreateRoomType } from './CreateRoomType';
import '../../Styles/RoomTypes.css'


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
			<h3>Room Types</h3>
				<div className='table-wrap' >                
					<table className='room-type-table'>
						<thead>
							<tr> 
								<th width="200px">Name</th>
								<th width="420px">Description</th>
								<th width="60px">Beds #</th>
								<th width="80px">Bed Size</th>
								<th width="120px">Max Capacity</th>
								<th width="60px">Price</th>
							</tr>
						</thead>
						<tbody>
							{listOfRooms.map((value, index) => (
								<React.Fragment key={index}>
									<tr>
										<td width="200px">{value.type_name}</td>
										<td width="420px">{value.description}</td>
										<td width="60px">{value.bed_qty}</td>
										<td width="80px">{value.bed_size}</td>
										<td width="120px">{value.max_capacity} Guests</td>
										<td width="60px">${value.base_price}</td>
										<td>                         
											<h3 id='roomDetailButton' onClick={() => toggleRow(index)}>
												{expandedRows.includes(index) ? '[ ̶̶̶  ]' : '[+]'}</h3>
										</td>
									</tr>
									{expandedRows.includes(index) &&(
										<RoomModificationExpand
										value = {listOfRooms[index]}
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
		</div>
  )
}
