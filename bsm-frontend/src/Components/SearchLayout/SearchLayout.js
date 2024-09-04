import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import Search from '../../Pages/User/Search/Search'

const SearchLayout = () => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidebar
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
        <div className="col-md-10">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
