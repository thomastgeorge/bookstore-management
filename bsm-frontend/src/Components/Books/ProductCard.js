import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import RatingStar from './RatingStar'; // Ensure this component is in your project

const ProductCard = ({
  id,
  price,
  cover,
  title,
  category,
  rating
}) => {
  return (
    <div className="border border-gray-200 font-lato rounded-lg shadow-md overflow-hidden w-full">
      <div className="text-center border-b border-gray-200">
        <Link to={`/product/${id}`}>
          <img
            src={cover}
            alt={title}
            className="w-full h-40 object-cover transition-transform duration-200 hover:scale-105"
          />
        </Link>
      </div>
      <div className="p-3">
        <p className="text-gray-500 text-xs font-medium">{category}</p>
        <Link
          className="block font-semibold text-blue-600 hover:underline text-sm"
          to={`/product/${id}`}
        >
          {title}
        </Link>
      </div>
      <div className="px-3 mb-2">
        <RatingStar rating={rating} />
      </div>
      <div className="flex items-center justify-between px-3 py-1 bg-gray-100 border-t border-gray-200">
        <h2 className="font-medium text-blue-500 text-lg">₹{price}</h2>
        <button
          type="button"
          className="flex items-center space-x-2 px-2 py-1 bg-purple-900 text-white rounded hover:bg-purple-700 transition"
        >
          <AiOutlineShoppingCart />
          <span className="text-xs">BUY NOW</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
