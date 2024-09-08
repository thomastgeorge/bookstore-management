import React, { useState, useEffect } from 'react';
import axios from '../../../Service/Axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState({
    categoryId: '',
    categoryName: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredCategories(categories.filter(category =>
        category.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        category.categoryId.toString().includes(query)
      ));
    } else {
      setFilteredCategories(categories);
    }
  }, [query, categories]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/v1/category');
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
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
    const url = isEditMode ? `/api/v1/category` : `/api/v1/category`;

    try {
      await axios({
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: form,
      });
      fetchCategories();
      resetForm();
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setForm({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleBack = () => {
    resetForm();
    setIsEditMode(false);
  };

  const resetForm = () => {
    setForm({
      categoryId: '',
      categoryName: '',
    });
    setEditCategory(null);
  };

  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b">
        <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-4xl font-medium font-lora dark:text-white">
              Category Management
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 mt-4">
            {/* Add/Edit Category Form */}
            <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
              <h3 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Category' : 'Add New Category'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="categoryName"
                      placeholder="Category Name"
                      value={form.categoryName || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditMode ? 'Update Category' : 'Add Category'}
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

            {/* Category List */}
            <div className="bg-white p-6 rounded shadow-md dark:bg-slate-700">
              <h3 className="text-xl font-semibold mb-4">Category List</h3>
              <form className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-600 dark:text-white px-3 py-2"
                />
              </form>
              {isLoading ? (
                <p>Loading...</p>
              ) : filteredCategories.length === 0 ? (
                <p>No categories found. Try a different search.</p>
              ) : (
                <ul>
                  {filteredCategories.map((category) => (
                    <li key={category.categoryId} className="mb-4 border-b border-gray-200 dark:border-gray-600 pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold">{category.categoryId}. {category.categoryName}</h4>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.categoryId)}
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

export default CategoryManagement;
