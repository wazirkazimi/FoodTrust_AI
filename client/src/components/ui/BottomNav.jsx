import React from 'react';
import { Home, Search, Camera, ClipboardList, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-inner py-2 flex justify-around">
      <NavLink to="/home" className="flex flex-col items-center text-xs">
        <Home />
        Home
      </NavLink>
      <NavLink to="/search" className="flex flex-col items-center text-xs">
        <Search />
        Search
      </NavLink>
      <NavLink to="/scan" className="flex flex-col items-center text-xs -mt-4">
        <div className="bg-primary p-4 rounded-full shadow-lg">
          <Camera className="text-white" />
        </div>
        Scan
      </NavLink>
      <NavLink to="/foodlog" className="flex flex-col items-center text-xs">
        <ClipboardList />
        Log
      </NavLink>
      <NavLink to="/profile" className="flex flex-col items-center text-xs">
        <User />
        Profile
      </NavLink>
    </nav>
  );
}
