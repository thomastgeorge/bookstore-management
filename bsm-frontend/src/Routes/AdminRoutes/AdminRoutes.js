import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Footer from '../../Components/Footer/Footer';
import NavBar from '../../Components/NavBar/NavBar';
import AdminHome from '../../Pages/Admin/AdminHome/AdminHome.js'
import AdminLayout from '../AdminLayout/AdminLayout.js'
import AdminCustomer from '../../Pages/Admin/AdminCustomer/AdminCustomer.js'
import AdminBooks from '../../Pages/Admin/AdminBooks/AdminBooks.js'
import AdminReview from '../../Pages/Admin/AdminReview/AdminReview.js'
import AdminOrder from '../../Pages/Admin/AdminOrder/AdminOrder.js'
import AdminCategory from '../../Pages/Admin/AdminCategory/AdminCategory.js'


const AdminRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/books" element={<AdminBooks />} />
          <Route path="/customers" element={<AdminCustomer />} />
          <Route path="/categories" element={<AdminCategory />} />
          <Route path="/orders" element={<AdminOrder />} />
          <Route path="/reviews" element={<AdminReview />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default AdminRoutes;
