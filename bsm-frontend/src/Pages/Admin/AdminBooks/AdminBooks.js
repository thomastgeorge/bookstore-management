import React, { useState, useEffect, useContext } from 'react';
import axios from '../../../Service/Axios';
import { UserContext } from '../../../App.js'
import Button from '../../../Components/Atoms/Button.js'
import Text from '../../../Components/Atoms/Text.js'
import config from '../../../Util/config.js';
import callAPI from '../../../Util/callApi.js';

const BookManagement = () => {
  const { user } = useContext(UserContext)
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    isbn: '',
    price: '',
    publishedDate: '',
    lastUpdatedDate: '',
    avgRating: '',
    cover: '',
    available: 'true', // Changed from boolean to string for dropdown
    category: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/v1/book');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/v1/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const searchBook = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/v1/book/${user.role}/search`, {
        params: { query },
      });
      setBooks(response.data);
    } catch (err) {
      console.error('Error searching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    
    // Clear errors related to the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Cover URL validation
    if (form.cover && !/\.(jpg|png|jpeg)$/i.test(form.cover)) {
      newErrors.cover = 'Cover URL must end with .jpg, .png, or .jpeg';
    }

    // Price validation
    if (!form.price || form.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Published Date validation
    const today = new Date().toISOString().split('T')[0];
    if (form.publishedDate && new Date(form.publishedDate) > new Date(today)) {
      newErrors.publishedDate = 'Published Date cannot be in the future';
    }

    // Last Updated Date validation
    if (form.lastUpdatedDate) {
      const publishedDate = new Date(form.publishedDate);
      const lastUpdatedDate = new Date(form.lastUpdatedDate);

      if (lastUpdatedDate > new Date(today)) {
        newErrors.lastUpdatedDate = 'Last Updated Date cannot be in the future';
      }

      if (publishedDate && lastUpdatedDate < publishedDate) {
        newErrors.lastUpdatedDate = 'Last Updated Date must be after Published Date';
      }
    }

    // Set errors if any
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try { 
      if(isEditMode){
        let url = config.api.book.update
          .replace("{{bookId}}", editBook.bookId)
          .replace("{{category}}", form.category);
        const body = { ...form, category: null };
        await callAPI.put(url, body);
      } else {
        let url = config.api.book.create
          .replace("{{category}}", form.category);
        const body = { ...form, category: null };
        await callAPI.post(url, body);
      }
      fetchBooks();
      resetForm();
    } catch (error) {
      console.error('Error submitting book:', error);
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setForm({
      title: book.title,
      author: book.author,
      description: book.description,
      isbn: book.isbn,
      price: book.price,
      publishedDate: book.publishedDate,
      lastUpdatedDate: book.lastUpdatedDate,
      avgRating: book.avgRating,
      cover: book.cover,
      available: book.available ? 'true' : 'false', // Convert boolean to string
      category: book.category.categoryId,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      let url = config.api.book.delete
        .replace("{{bookId}}", id);
      await callAPI.delete(url);
      // await axios.delete(`/api/v1/book/delete/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleBack = () => {
    resetForm();
    setIsEditMode(false);
  };

  const resetForm = () => {
    setForm({
      title: '',
      author: '',
      description: '',
      isbn: '',
      price: '',
      publishedDate: '',
      lastUpdatedDate: '',
      avgRating: '',
      cover: '',
      available: 'true', // Reset to default 'true'
      category: '',
    });
    setEditBook(null);
    setErrors({});
  };

  // Helper function to get min date based on the form state
  const getMinDate = () => {
    if (form.publishedDate) {
      return form.publishedDate;
    }
    return '1900-01-01'; // Default minimum date
  };

  return (
    <main className="relative">
      <section>
        <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-medium font-lora dark:text-white">
              Book Management
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 mt-4">
            {/* Add/Edit Book Form */}
            <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
              <h3 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Book' : 'Add New Book'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4">
                  {Object.entries({
                    title: 'Title',
                    author: 'Author',
                    description: 'Description',
                    isbn: 'ISBN',
                    price: 'Price',
                    publishedDate: 'Published Date',
                    lastUpdatedDate: 'Last Updated Date',
                    avgRating: 'Average Rating',
                    cover: 'Cover URL',
                  }).map(([key, label]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                      </label>
                      {key === 'description' ? (
                        <textarea
                          name={key}
                          placeholder={label}
                          value={form[key] || ''}
                          onChange={handleChange}
                          rows="3"
                          className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
                        />
                      ) : (
                        <input
                          type={key === 'price' || key === 'avgRating' ? 'number' : key === 'publishedDate' || key === 'lastUpdatedDate' ? 'date' : 'text'}
                          name={key}
                          placeholder={label}
                          value={form[key] || ''}
                          onChange={handleChange}
                          min={key === 'publishedDate' || key === 'lastUpdatedDate' ? getMinDate() : undefined}
                          max={key === 'publishedDate' || key === 'lastUpdatedDate' ? new Date().toISOString().split('T')[0] : undefined}
                          disabled={key === 'lastUpdatedDate' && !form.publishedDate}
                          className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
                          required={key === 'title' || key === 'price'}
                        />
                      )}
                      {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category || ''}
                      onChange={handleChange}
                      className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="p-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Available
                    </label>
                    <select
                      name="available"
                      value={form.available || 'true'}
                      onChange={handleChange}
                      className="p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
                      required
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                </div>
                <Button
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                  style={{
                    backgroundColor: "#3B82F6",
                    borderRadius: "8px",
                    height: '35px',
                    width: '100px',
                    marginLeft: '4px',
                  }}
                >
                  <Text
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "5px",
                      color: 'white',
                    }}
                  >
                    {isEditMode ? 'Update Book' : 'Add Book'}
                  </Text>
                </Button>

                {isEditMode && (
                  <Button 
                    onClick={handleBack}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6B7280'}
                    style={{
                      backgroundColor: "#6B7280",
                      borderRadius: "8px",
                      height: '35px',
                      width: '75px',
                      marginLeft: '4px',
                    }}
                  >
                    <Text
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding:"5px",
                        color: 'white',
                      }}
                    >
                      Back
                    </Text>
                  </Button>
                )}
              </form>
            </div>

            {/* Book List */}
            <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
              <h3 className="text-xl font-semibold mb-4">Book List</h3>
              <form onSubmit={searchBook} className="mb-4">
                <input
                  type="text"
                  placeholder="Search by title or author or category"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white px-3 py-2"
                />
              </form>
              {isLoading ? (
                <p>Loading...</p>
              ) : books.length === 0 ? (
                <p>No books found. Try a different search.</p>
              ) : (
                <ul>
                  {books.map((book) => (
                    <li key={book.bookId} className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold">{book.bookId}. {book.title}</h4>
                          <p>{book.author} - ₹{book.price}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleEdit(book)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F59E0B'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FBBF24'}
                            style={{
                              backgroundColor: "#FBBF24",
                              borderRadius: "8px",
                              height: '35px',
                              width: '55px',
                          }}
                          >
                            <Text
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding:"5px",
                                color: 'white',
                              }}
                            >
                              Edit
                            </Text>
                          </Button>
                          <Button 
                            onClick={() => handleDelete(book.bookId)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B91C1C'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
                            style={{
                              backgroundColor: "#DC2626",
                              borderRadius: "8px",
                              height: '35px',
                              width: '75px',
                          }}
                          >
                            <Text
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding:"5px",
                                color: 'white',
                              }}
                            >
                              Delete
                            </Text>
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookManagement;
