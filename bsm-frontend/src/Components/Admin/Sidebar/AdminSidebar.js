import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminSidebar = () => {
  return (
    <div className="sidebar bg-light p-3 justify-content-around" style={{ width: '180px', height: '80vh' }}>
      <Nav className="flex-column" style={{width: '120px'}}>
        <Nav.Link 
          as={Link} 
          to="/admin" 
          className="btn btn-dark rounded-pill py-2 px-3 mb-2 text-center text-decoration-none text-white"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Home
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/books" 
          className="btn btn-dark rounded-pill py-2 px-3 mb-2 text-center text-decoration-none text-white"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Books
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/customers" 
          className="btn btn-dark rounded-pill py-2 px-3 mb-2 text-center text-decoration-none text-white"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Customers
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/categories" 
          className="btn btn-dark rounded-pill py-2 px-3 mb-2 text-center text-decoration-none text-white"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Categories
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/orders" 
          className="btn btn-dark rounded-pill py-2 px-3 mb-2 text-center text-decoration-none text-white"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Orders
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/admin/reviews" 
          className="btn btn-dark rounded-pill py-2 px-3 mb-2 text-center text-decoration-none text-white"
          style={{ backgroundColor: 'black', borderColor: 'black' }}
        >
          Reviews
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
