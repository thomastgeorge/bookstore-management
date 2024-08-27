import React from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const nav = useNavigate();

  return (
    <div >
      <Navbar bg="light" expand="md" className="py-2">
        <div className="container-fluid mx-3">
          {/* Logo */}
          <Navbar.Brand
            onClick={() => nav('/')}
            className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
          >
            <img
              src="logo.png"
              width="50"
              height="45"
              className="d-inline-block align-top me-2"
              alt="Logo"
            />
            <span className="font-weight-bold">Libreria</span>
          </Navbar.Brand>

          {/* Mobile Toggle Button (Hamburger Icon) */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Content */}
          <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
              {/* Centered Search Bar */}
              <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                <Dropdown className="me-2">
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    Category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => nav('/')}>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => nav('/')}>
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => nav('/')}>
                      Something else here
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="d-flex align-items-center" style={{ maxWidth: '100%' }}>
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control custom-search-bar rounded-0"
                    style={{ minWidth: '200px', maxWidth: '400px', width: '100%' }}
                  />
                  <Button variant="outline-secondary" className="rounded-0">
                    <FaSearch />
                  </Button>
                </div>
              </div>

              {/* Right side (User Icons and Login Button) */}
              <Nav className="d-flex align-items-center justify-content-center flex-column flex-md-row">
                <Button
                  onClick={() => nav('/login')}
                  variant="success"
                  className="text-white mx-3 px-4 my-2 my-md-0"
                >
                  Login
                </Button>
                <div className="d-flex">
                  <Nav.Link
                    onClick={() => nav('/account/cart')}
                    className="mx-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaShoppingCart size="1.7em" />
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => nav('/account')}
                    className="mx-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaRegUserCircle size="1.7em" />
                  </Nav.Link>
                </div>
              </Nav>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
