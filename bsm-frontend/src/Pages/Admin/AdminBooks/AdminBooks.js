import React, { useState, useEffect } from 'react';
import axios from '../../../Service/Axios';


const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [ category, setCategory] = useState(null)
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
    available: true,
    category: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchBooks();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditMode ? 'put' : 'post';
    const currentCategory = form.category;
    setCategory(currentCategory);
    const url = isEditMode ? `/api/v1/book/update/${editBook.bookId}/${category}` : `/api/v1/book/create/${form.category}`;
    try {
      const updatedForm = { ...form, category: null };
      await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: updatedForm,
      });
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
      available: book.available,
      category: book.category.categoryId, // Assuming category is an object with an id field
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/book/delete/${id}`);
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
      available: true,
      category: '',
    });
    setEditBook(null);
  };

  return (
    <main className="relative">
     
      <section className="xl:padding-l wide:padding-r padding-b pt-20">
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
                    available: 'Available',
                    category: 'Category ID',
                    }).map(([key, label]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                        </label>
                        <input
                        type={key === 'price' || key === 'avgRating' ? 'number' : key === 'publishedDate' || key === 'lastUpdatedDate' ? 'date' : key === 'category' ? 'number' : 'text' }
                        name={key}
                        placeholder={label}
                        value={form[key] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
                        required={key === 'title' || key === 'price' || key === 'category'}
                        />
                    </div>
                    ))}

                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Book' : 'Add Book'}
                </button>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Back
                  </button>
                )}
              </form>
            </div>

            {/* Book List */}
            <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
              <h3 className="text-xl font-semibold mb-4">Book List</h3>
              {isLoading ? (
                <p>Loading...</p>
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
                          <button
                            onClick={() => handleEdit(book)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(book.bookId)}
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
        </div>
      </section>
    </main>
  );
};

export default BookManagement;
