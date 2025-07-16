import React from 'react';
import CartIndicator from './CartIndicator';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold"></h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            {/* <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">홈</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors duration-200">상품</a></li> */}
            <li><CartIndicator /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;