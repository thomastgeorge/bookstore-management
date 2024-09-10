import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaHandHoldingUsd, FaRegUser ,FaCheck  } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import RatingStar from "./RatingStar";
import axios from "../../Service/Axios";
import SimilarBook from "./SimilarBook";
import Rating from '@mui/material/Rating';
import { TextareaAutosize } from '@mui/material';
import { ToastContainer, toast,Slide } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import { UserContext } from "../../App";

const SingleBook = () => {
  const currentPageUrl = window.location.href;
  localStorage.setItem('currentPageUrl', currentPageUrl);
  
  const { user } = useContext(UserContext)
  const { bookID } = useParams();
  const [book, setBook] = useState(null);
  const [sCategory, setScategory] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({ headLine: '', comment: '', rating: 5 });
  const [reviews, setReviews] = useState([]);
  const [ratingValue, setRatingValue] = useState(5);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/book/${bookID}`);
        const bookData = response.data;
        setBook(bookData);
        setScategory(bookData.category.categoryName || '');
      } catch (error) {
        setError("Error fetching book details.");
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookID]);

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      if (!sCategory) return;
      try {
        const response = await axios.get(`/api/v1/book/category/${sCategory}`);
        const filteredBooks = response.data.filter(b => b.id !== parseInt(bookID));
        setSimilar(filteredBooks.slice(0, 4));
      } catch (error) {
        setError("Error fetching similar books.");
        console.error('Error fetching similar books:', error);
      }
    };

    fetchSimilarBooks();
  }, [sCategory, bookID]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/v1/review/book/${bookID}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [bookID]);

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setRatingValue(newValue);
    setReview({ ...review, rating: newValue });
  };

  const handleSubmitReview = async () => {
    try {
      await axios.post(`/api/v1/review/create/${bookID}`, { ...review, rating: ratingValue });
      setReview({ headLine: '', comment: '', rating: 5 });
      setRatingValue(5);
      // Refresh reviews after submission
      const response = await axios.get(`/api/v1/review/book/${bookID}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartDto = { quantity: 1 }; // Example data
      await axios.post(`/api/v1/cart/create/${bookID}`, cartDto);
      toast.success('Book added to cart!'); // Display toast notification
    } catch (error) {
      console.error('Error adding book to cart:', error);
      toast.info('Book already in cart'); // Display error toast notification
    }
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <main className="relative">
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
      <div className="container mx-auto pt-8 dark:text-white">
        <div className="flex flex-col md:flex-row gap-14 px-4 font-karla">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={book.cover || ''}
              alt="Cover"
              className="w-full md:w-80 h-120 object-cover"
            />
          </div>
          
          {/* Book Details Section */}
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <h2 className="text-sm font-hidden">{book.author}</h2>
            {book.avgRating && <RatingStar rating={parseFloat(book.avgRating.toFixed(1))} />}
            
            <table className>
              <tbody>
                <tr>
                  <td className="pr-2 font-semibold">Category</td> 
                   <td>{book.category.categoryName}</td>
                </tr>
                <tr>
                  {/* <td className="pr-2 font-semibold">ISBN</td> */}
                  {/* <td>{book.isbn}</td> */}
                </tr>
                <tr>
                   {/* <td className="pr-2 font-bold">Stock</td> */}
                     <td className={`font-semibold ${book.available ? 'text-green-500' : 'text-red-500'}`}>
                          {book.available ? 'In Stock' : 'Out of Stock'}
                        </td>
                   </tr>
              </tbody>
            </table>
            <div className="mt-1">
              <h2 className="font-medium text-blue-500 text-xl">₹ {book.price}</h2>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold text-2xl">ABOUT</h2>
              <p className="leading-5">{book.description}</p>
            </div>
            <div>
              <h2 className="font-semibold text-2xl">Policy</h2>
              <p>We do not offer returns or replacements on this product.</p>
            </div>
            <div className="flex flex-wrap items-center mt-4 mb-2 space-x-2">
              <button
                type="button"
                className="flex items-center space-x-1  mb-2 text-white p-2 rounded bg-purple-900"
                onClick={handleAddToCart}
              >
                <AiOutlineShoppingCart />
                <span>ADD TO CART</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-1 mb-2 bg-blue-700 text-white p-2 rounded"
                onClick={() => document.getElementById('review-section').scrollIntoView({ behavior: 'smooth' })}
              >
                <MdRateReview />
                <span>ADD REVIEW</span>
              </button>
            </div>
          </div>
        </div>
        
        <hr className="mt-4" />
        <SimilarBook title="You Might Also Like" products={similar} />
        <br />
        
        {/* Review Section */}
        <section id="review-section" className="mt-8">
          <h2 className="text-3xl font-bold dark:text-white">Reviews</h2>
          <div className="mt-4">
            { user ? (
            <div className="mb-4">
              <h3 className="text-xl font-semibold dark:text-white">Write a Review</h3>
              <div className="mt-2">
                <input
                  type="text"
                  name="headLine"
                  value={review.headLine}
                  onChange={handleReviewChange}
                  placeholder="Review headline"
                  className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
                />
                <TextareaAutosize
                  name="comment"
                  value={review.comment}
                  onChange={handleReviewChange}
                  placeholder="Your review"
                  rows="4"
                  className="w-full p-2 border rounded mt-2 dark:bg-slate-700 dark:text-white"
                />
                <div className="mt-2">
                  <Rating
                    name="hover-feedback"
                    defaultValue={2} 
                    onChange={handleRatingChange}
                    size="large"
                    // precision={0.5}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  className="flex items-center space-x-1 mb-2 bg-yellow-400 text-white p-2 rounded ml-auto"
                ><FaCheck />
                 <span>SUBMIT REVIEW</span>
                </button>
              </div>
            </div>
            ) : null }
            {reviews.map(review => (
              <div key={review.reviewId} style={{ marginBottom: '1rem' }}>
                {/* First Row: User icon and customer name */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <FaRegUser style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{review.customer.name}</p>
                </div>
                
                {/* Second Row: Headline and rating */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: '600', marginRight: '0.7rem', margin: 0 }}>{review.headLine} </p>
                  {review.rating && <RatingStar rating={review.rating} style={{ verticalAlign: 'middle' }} />}
                </div>
                
                {/* Third Row: Review date */}
                <p style={{ color: '#4a4a4a', marginBottom: '0.5rem' }}>Reviewed on {review.reviewedOn}</p>
                
                {/* Comments */}
                <p style={{ marginTop: '0.5rem' }}>{review.comment}</p>
                
                {/* Divider */}
                <hr style={{ marginTop: '0.5rem', borderColor: '#e2e2e2' }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default SingleBook;
