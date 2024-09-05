import React, { useContext, useState } from 'react'
import { UserContext } from '../../App.js'
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext)
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null); // Update user state/context
    nav('/login'); // Redirect to login page
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const encodedQuery = encodeURIComponent(trimmedQuery);
      nav(`/search?query=${encodedQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent form submission
      handleSearch();
    }
  };

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
                <div className="d-flex align-items-center" style={{ maxWidth: '100%' }}>
                  <Form
                    className="d-flex align-items-center flex-grow-1"
                    style={{ maxWidth: '500px', width: '100%' }}
                    onKeyDown={handleKeyDown}  // Add keydown event listener
                  >
                    <Form.Control
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-0 me-2"
                    />
                    <Button
                      variant="outline-secondary"
                      className="rounded-0"
                      onClick={handleSearch}
                      aria-label="Search"
                      style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                    >
                      <FaSearch />
                    </Button>
                  </Form>
                </div>
              </div>
              {/* Right side (User Icons and Login Button) */}
              <Nav className="d-flex align-items-center justify-content-center flex-column flex-md-row">

              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="danger" // Changed to 'danger' for logout button
                  style={{ backgroundColor: '#c62828', borderColor: '#c62828' }} // Different color for logout
                  className="text-white mx-3 px-4 my-2 my-md-0"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => nav('/login')}
                  variant="success"
                  style={{ backgroundColor: '#4a1f77', borderColor: '#4a1f77' }}
                  className="text-white mx-3 px-4 my-2 my-md-0"
                >
                  Login
                </Button>
              )}

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
