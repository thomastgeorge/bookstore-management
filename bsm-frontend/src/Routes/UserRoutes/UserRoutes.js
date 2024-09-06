import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import Home from '../../Pages/User/Home/Home';
import Account from '../../Pages/User/Account/Account';
import Cart from '../../Pages/User/Cart/Cart';
import Orders from '../../Pages/User/Orders/Orders';
import OurStory from '../../Pages/OurStory/OurStory';
import Profile from '../../Pages/User/Profile/Profile';
import Address from "../../Pages/User/Address/Address";
// import SingleBook from '../../Components/Books/SingleBook';
import SearchLayout from '../../Components/SearchLayout/SearchLayout'
import Contact from '../../Pages/Contact/Contact'
import SingleBook from '../../Components/Books/SingleBook1';
import Review from '../../Pages/User/Review/Review';

const UserRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookID" element={<SingleBook />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/cart" element={<Cart />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/address" element={<Address />} />
        <Route path="/search" element={<SearchLayout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account/reviews" element={<Review />} /> 
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
