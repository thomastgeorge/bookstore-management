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
        <div className="col-lg-2 col-md-3">
          <Sidebar
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
        <div className="col-lg-10 col-md-9 ">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
