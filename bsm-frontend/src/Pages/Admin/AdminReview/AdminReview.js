import React, { useState, useEffect } from 'react';
import axios from '../../../Service/Axios';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
    fetchBooks(); // Fetch books for selection in the dropdown
    fetchCustomers(); // Fetch customers for selection in the dropdown
  }, []);

  useEffect(() => {
    fetchReviews(); // Fetch reviews whenever filters change
  }, [selectedBookId, selectedCustomerId]);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      let url = '/api/v1/review';
      if (selectedBookId) {
        url = `/api/v1/review/book/${selectedBookId}`;
      } else if (selectedCustomerId) {
        url = `/api/v1/review/customer/admin/${selectedCustomerId}`;
      }
      const response = await axios.get(url);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/v1/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/v1/customer');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/v1/review/${reviewId}`);
      fetchReviews(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleBookChange = (e) => {
    const bookId = e.target.value;
    setSelectedBookId(bookId);
    if (!bookId) {
      setSelectedCustomerId(''); // Clear customer filter if book filter is cleared
    }
  };

  const handleCustomerChange = (e) => {
    const customerId = e.target.value;
    setSelectedCustomerId(customerId);
    if (!customerId) {
      setSelectedBookId(''); // Clear book filter if customer filter is cleared
    }
  };

  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b pt-20">
        <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-medium font-lora dark:text-white">
              Review Management
            </h2>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <label htmlFor="bookSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Book
            </label>
            <select
              id="bookSelect"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
              value={selectedBookId}
              onChange={handleBookChange}
            >
              <option value="">All Books</option>
              {books.map((book) => (
                <option key={book.bookId} value={book.bookId}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="customerSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Customer
            </label>
            <select
              id="customerSelect"
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
              value={selectedCustomerId}
              onChange={handleCustomerChange}
            >
              <option value="">All Customers</option>
              {customers.map((customer) => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
            <h3 className="text-xl font-semibold mb-4">Review List</h3>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {reviews.map((review) => (
                  <li key={review.reviewId} className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold">{review.headLine}</h4>
                        <p>{review.comment}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Reviewed On: {review.reviewedOn ? new Date(review.reviewedOn).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(review.reviewId)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReviewManagement;
