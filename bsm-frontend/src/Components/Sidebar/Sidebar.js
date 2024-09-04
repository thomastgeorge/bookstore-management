import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from '../../Service/Axios'

const Sidebar = ({ category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get('api/v1/category');
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Update URL whenever any filter changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (category) {
      queryParams.set('category', category);
    } else {
      queryParams.delete('category');
    }

    if (minPrice) {
      queryParams.set('minPrice', minPrice);
    } else {
      queryParams.delete('minPrice');
    }

    if (maxPrice) {
      queryParams.set('maxPrice', maxPrice);
    } else {
      queryParams.delete('maxPrice');
    }

    navigate(`?${queryParams.toString()}`);
  }, [category, minPrice, maxPrice, navigate, location.search]);

  return (
    <aside className="p-3 bg-light border-end" style={{ width: '220px', height: '550px' }}>
      <h2>Filter</h2>
      <Form.Group className="mb-3">
        <Form.Label>Category:</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price Range:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="mb-2" // Add margin-bottom to space out the inputs
          min="0"
        />
        <Form.Control
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
        />
      </Form.Group>
    </aside>
  );
};

export default Sidebar;
