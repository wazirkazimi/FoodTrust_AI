import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Navbar = ({
  title,
  showBack = false,
  backTo = '/',
  rightElement
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          {showBack && (
            <Link
              to={backTo}
              className="p-2 -m-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>

        {rightElement && (
          <div>{rightElement}</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;