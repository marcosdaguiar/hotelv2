import React, { useState } from 'react';
import Layout2 from './layout2';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Occupancy} from '@/pages/Occupancy';
import {Guests} from '@/pages/Guests';
import {Rooms} from '@/pages/Rooms';
import {Settings} from '@/pages/Settings';
import {RoomTypes} from '@/pages/RoomTypes';
import {Booking} from '@/pages/Booking';

const Layout = (sidebar) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-slate-200 text-white 
        flex flex-col
      `}>
        <Layout2/>
             
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Body */}
        <main className="flex-1 p-4 bg-slate-200">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Booking/>} />
                <Route path="/Booking" element={<Booking/>} />
                <Route path="/Occupancy" element={<Occupancy/>} />
                <Route path="/Guests" element={<Guests/>} />
                <Route path="/Rooms" element={<Rooms/>} />
                <Route path="/RoomsTypes" element={<RoomTypes/>} />
                <Route path="/Settings" element={<Settings/>} />
            </Routes>
        </BrowserRouter>
        
        </main>

        {/* Footer */}
        <footer className="h-8 bg-slate-700 border-t flex items-center justify-center">
          <div className="text-white text-sm">Hotel Management V3</div>
        </footer>
      </div>
    </div>
    
  );
};

export default Layout;