import React, { useContext } from 'react';
import './ProductCard.css'; // Import the CSS file
import RatingStar from './RatingStar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Slide } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import config from '../../Util/config';
import callAPI from '../../Util/callApi';

const ProductCard = ({ book }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.bookId}`, { state: { book } });
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    if (!user) {
      // Redirect to login page if the user is not logged in
      navigate('/login');
      return;
    }
    try {
      const cartDto = { quantity: 1 }; // Example data
      let url = config.api.cart.create
        .replace("{{bookId}}", book.bookId);
      await callAPI.post(url, cartDto)
      toast.success('Book added to cart!');
    } catch (error) {
      console.error('Error adding book to cart:', error);
      toast.info('Book already in cart');
    }
  };

  return (
    
    <div className='container_product_card' onClick={handleClick} >
      <div className='product_card'>
      <ToastContainer // Add ToastContainer to your component
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
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
          
          <button type="button" 
          className='cta_add_to_cart'
          onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
