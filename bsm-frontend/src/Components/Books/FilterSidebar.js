import React from 'react';
import { FormControlLabel, Checkbox, TextField, Divider } from '@mui/material';

const FilterSidebar = ({ filters, handleFilterChange }) => {
  return (
    <aside className="w-1/4 p-4 bg-white border-r border-gray-200">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Filters</span>
          <button className="text-blue-500">Clear all</button>
        </div>
        <Divider className="mb-4" />
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Category</h3>
          {['Mobiles & Accessories', 'Mobiles'].map(category => (
            <FormControlLabel
              key={category}
              control={<Checkbox checked={filters.category.includes(category)} onChange={handleFilterChange} value={category} name="category" />}
              label={category}
            />
          ))}
        </div>
        <Divider className="mb-6" />
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Price</h3>
          <div className="flex items-center mb-4">
            <select
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="border p-2 rounded w-1/2 mr-2"
            >
              <option value="Min">Min</option>
              <option value="10000">₹10000</option>
              <option value="15000">₹15000</option>
            </select>
            <span className="mx-2">to</span>
            <select
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="border p-2 rounded w-1/2"
            >
              <option value="15000">₹15000</option>
              <option value="20000">₹20000</option>
              <option value="30000">₹30000</option>
              <option value="Max">₹30000+</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
