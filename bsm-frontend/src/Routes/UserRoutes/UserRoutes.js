import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import Home from '../../Pages/User/Home/Home';
import Account from '../../Pages/User/Account/Account';
import Cart from '../../Pages/User/Cart/Cart';
import Orders from '../../Pages/User/Orders/Orders';
import OurStory from '../../Pages/OurStory/OurStory';
import AllBooks from '../../Components/Books/AllBooks';
import Profile from '../../Pages/User/Profile/Profile';
import Address from "../../Pages/User/Address/Address"

const UserRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/cart" element={<Cart />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/address" element={<Address />} />
        <Route path="/all-books" element={<AllBooks/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
