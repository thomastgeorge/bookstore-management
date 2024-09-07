// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../Components/Admin/Sidebar/AdminSidebar';

const layoutStyle = {
  display: 'flex',
};

const containerStyle = {
  marginLeft: '20px',
  padding: '20px',
  width: 'calc(100% - 20px)',
};

const AdminLayout = () => {
  return (
    <div style={layoutStyle}>
      <AdminSidebar />
      <div style={containerStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
