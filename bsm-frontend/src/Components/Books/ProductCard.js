import React from 'react';
import './ProductCard.css'; // Import the CSS file
import RatingStar from './RatingStar';

const ProductCard = ({ book }) => {
  return (
    <div className='container_product_card'>
      <div className='product_card'>
        <div className='top_card'>
          {/* Image and price */}
          <img src={book.cover} className="product_image" alt={book.title} />
          
        </div>
        <div className='bottom_card'>
          {/* Name, description, and CTA */}
          <div className='product_name'>
            <h6>{book.author}</h6>
            <h4>{book.title}</h4>
            <div className='product_description'>
          <RatingStar className='product_rating' rating={book.avgRating} /> <span className='product_price'>₹ {book.price}</span>
          </div>
          </div>
          
          <button type="button" className='cta_add_to_cart'>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
