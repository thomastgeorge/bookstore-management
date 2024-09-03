import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const RatingStar = ({ rating }) => {
  // Ensure rating is a number and round it to one decimal place
  const ratingNum = Math.round(rating * 2) / 2; // round to nearest half-star
  const fullStars = Math.floor(ratingNum);
  const hasHalfStar = ratingNum % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-[#ffb21d]">
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <AiFillStar key={`full-${index}`} />
      ))}
      {/* Render half star if needed */}
      {hasHalfStar && <AiFillStar className="text-[#ffb21d]" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <AiOutlineStar key={`empty-${index}`} />
      ))}
      {/* Display rating */}
      <span className="ml-2 text-gray-600 font-semibold dark:text-white">
        {rating}
      </span>
    </div>
  );
};

export default RatingStar;
