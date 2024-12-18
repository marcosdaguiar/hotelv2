import React, { useState } from 'react'
import {Routes, Route, NavLink, BrowserRouter } from 'react-router-dom';
import { Guests } from '../Pages/Guests';
import { Logout } from '../Pages/Logout';
import { Reports } from '../Pages/Reports';
import { Occupancy} from '../Pages/Occupancy';
import { Settings } from '../Pages/Settings'
import { StaffManagement } from '../Pages/StaffManagement';
import { Error404 } from '../Pages/Error404';
import { Inbox } from '../Pages/Inbox';
import { RoomManagement } from '../Pages/RoomManagement';
import { Booking } from '../Pages/Booking';
import { RoomSettings } from '../Pages/RoomSettings';

export const RouterPrincipal = () => {
  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);

  return (
    <div className= "layout">
      <BrowserRouter>
      <nav className="side">
        <h1>Logo</h1>
        
        <hr></hr>
        <h1>User</h1>
        <ul>
          <li><NavLink to="/Booking">Booking</NavLink></li>
          <li><NavLink to="/Occupancy">Occupancy</NavLink></li>
          <li><NavLink to="/Guests">Guests</NavLink></li>
          <li>
            <div 
              onClick={() => setIsRoomMenuOpen(!isRoomMenuOpen)} 
              style={{
                cursor: 'pointer',
                padding: '8px',
                color: 'white'
              }}
            >
              Room Management {isRoomMenuOpen ? '▼' : '▶'}
            </div>
            {isRoomMenuOpen && (
              <ul>
                <li><NavLink to="/RoomManagement/general">General View</NavLink></li>
                <li><NavLink to="/RoomManagement/settings">Room Settings</NavLink></li>
              </ul>
            )}
          </li>
          <li><NavLink to="/StaffManagement">Staff Management</NavLink></li>
          <li><NavLink to="/Reports">Reports</NavLink></li>
          <li><NavLink to="/Settings">Settings</NavLink></li>
          <li><NavLink to="/Inbox">Inbox</NavLink></li>
          <li><NavLink to="/Logout">Log out</NavLink></li>
        </ul>
      </nav>

      <section className='content'>
        <Routes>
            <Route path = "/Booking" element = {<Booking/>} />
            <Route path = "/RoomManagement/general" element = {<RoomManagement/>} />
            <Route path = "/RoomManagement/settings" element = {<RoomSettings/>} />
            <Route path = "/Guests" element = {<Guests/>} />
            <Route path = "/Inbox" element = {<Inbox/>} />
            <Route path = "/Logout" element = {<Logout/>} />
            <Route path = "/Reports" element = {<Reports/>} />
            <Route path = "/Occupancy" element = {<Occupancy/>} />
            <Route path = "/Settings" element = {<Settings/>} />
            <Route path = "/StaffManagement" element = {<StaffManagement/>} />
            <Route path = "/*" element = {<Error404/>} />
        </Routes>
        <br></br>
      </section>

      <footer className='footer'>
        &copy; Hotel Management version 1.0
      </footer>
      </BrowserRouter>
    </div>
  )
}

