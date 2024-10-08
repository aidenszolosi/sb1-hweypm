import React from 'react';
import { Beer } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 bg-opacity-50 backdrop-blur-md text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Beer size={24} className="mr-2 text-blue-500" />
          <h1 className="text-xl font-bold gradient-text">DrinkTrack</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-400 transition duration-200">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition duration-200">About</a></li>
            <li><a href="#" className="hover:text-blue-400 transition duration-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;