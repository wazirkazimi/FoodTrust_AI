import React from 'react';
import { motion } from 'framer-motion';
import BottomNav from '../ui/BottomNav';
import { useAuth } from '../../context/AuthContext';

const PageWrapper = ({
  children,
  className = '',
  showBottomNav = true,
  title
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen bg-gray-50 ${className}`}
    >
      {title && (
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">{title}</h1>
        </div>
      )}

      <div className="pb-20"> {/* Add padding for bottom nav */}
        {children}
      </div>

      {showBottomNav && isAuthenticated && <BottomNav />}
    </motion.div>
  );
};

export default PageWrapper;