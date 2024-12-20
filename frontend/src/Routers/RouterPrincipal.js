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
import { Rooms } from '../Pages/Rooms';
import { Booking } from '../Pages/Booking';
import { RoomTypes } from '../Pages/RoomTypes';
import '../Styles/RouterPrincipal.css'

export const RouterPrincipal = () => {
  const [isRoomMenuOpen, setIsRoomMenuOpen] = useState(false);

  return (
    <div className= "layout">
      <BrowserRouter>
      <nav className="side">
        <h1>Logo</h1>
        
        <hr></hr>
        <h1>User</h1>
        <ul className='menu'>
            <li><NavLink to="/Booking" className={({ isActive }) => isActive ? 'active' : ''}>Booking</NavLink></li>
            <li><NavLink to="/Occupancy" className={({ isActive }) => isActive ? 'active' : ''}>Occupancy</NavLink></li>
            <li><NavLink to="/Guests" className={({ isActive }) => isActive ? 'active' : ''}>Guests</NavLink></li>
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
                <li><NavLink to="/RoomManagement/rooms" className={({ isActive }) => isActive ? 'active' : ''}>Rooms</NavLink></li>
                <li><NavLink to="/RoomManagement/types" className={({ isActive }) => isActive ? 'active' : ''}>Room Types</NavLink></li>
              </ul>
            )}
          </li>
            <li><NavLink to="/StaffManagement" className={({ isActive }) => isActive ? 'active' : ''}>Staff Management</NavLink></li>
            <li><NavLink to="/Reports" className={({ isActive }) => isActive ? 'active' : ''}>Reports</NavLink></li>
            <li><NavLink to="/Settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink></li>
            <li><NavLink to="/Inbox" className={({ isActive }) => isActive ? 'active' : ''}>Inbox</NavLink></li>
            <li><NavLink to="/Logout" className={({ isActive }) => isActive ? 'active' : ''}>Log out</NavLink></li>
        </ul>
      </nav>

      <section className='content'>
        <Routes>
            <Route path = "/Booking" element = {<Booking/>} />
            <Route path = "/RoomManagement/rooms" element = {<Rooms/>} />
            <Route path = "/RoomManagement/types" element = {<RoomTypes/>} />
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

