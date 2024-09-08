import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
// import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import AdminHome from '../../Pages/Admin/AdminHome/AdminHome.js'
import AdminLayout from '../AdminLayout/AdminLayout.js'
import AdminCustomer from '../../Pages/Admin/AdminCustomer/AdminCustomer.js'
import AdminBooks from '../../Pages/Admin/AdminBooks/AdminBooks.js'


const AdminRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/books" element={<AdminBooks />} />
          <Route path="/customers" element={<AdminCustomer />} />
          <Route path="/categories" element={<AdminHome />} />
          <Route path="/orders" element={<AdminHome />} />
          <Route path="/reviews" element={<AdminHome />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default AdminRoutes;
