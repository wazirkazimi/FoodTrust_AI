import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Camera, BookOpen, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/scan', icon: Camera, label: 'Scan' },
    { path: '/log', icon: BookOpen, label: 'Food Log' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isScan = path === '/scan';

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors duration-200 ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'
              } ${isScan ? 'relative' : ''}`}
            >
              {isScan && (
                <div className="absolute -top-6 w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <Icon size={24} className="text-white" />
                </div>
              )}
              {!isScan && <Icon size={20} />}
              <span className={`text-xs mt-1 ${isScan ? 'mt-3' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;