import React from 'react';
import { FaSearch, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import { Dropdown, Button } from 'react-bootstrap';

const NavBar = () => {
  return (
    <div className="container-fluid bg-light py-3">
      <div className="row align-items-center mx-2">
        {/* Logo and Site Name */}
        <div className="col-md-3 d-flex align-items-center mb-2 mb-md-0">
          <a href="/" className="d-flex align-items-center text-decoration-none text-dark">
            <img
              src="logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2" // Using Bootstrap spacing utility for margin
              alt="Logo"
            />
            <span className="font-weight-bold">Libreria</span>
          </a>
        </div>

        {/* Search Bar and Category Dropdown */}
        <div className="col-md-6 d-flex align-items-center mb-2 mb-md-0">
          {/* Category Dropdown */}
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#action/1">Action</Dropdown.Item>
              <Dropdown.Item href="#action/2">Another action</Dropdown.Item>
              <Dropdown.Item href="#action/3">Something else here</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="form-control me-2 border-0 rounded-0"
            style={{ flex: 1 }}
          />

          {/* Search Button */}
          <Button variant="outline-secondary" className="rounded-0">
            <FaSearch />
          </Button>
        </div>

        {/* User Icons */}
        <div className="col-md-3 d-flex justify-content-end align-items-center">
          <Button variant="warning" className="text-white mx-3">
            Login
          </Button>
          <a href="#cart" className="mx-3">
            <FaShoppingCart size="1.5em" />
          </a>
          <a href="#profile" className="mx-3">
            <FaRegUserCircle size="1.5em" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
