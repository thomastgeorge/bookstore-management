import React, { useContext } from 'react'
import { UserContext } from '../../App.js'
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext)
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUser(null); // Update user state/context
    nav('/login'); // Redirect to login page
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
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control custom-search-bar"
                    style={{
                      minWidth: '290px', // Adjust as needed
                      maxWidth: '600px', // Adjust as needed
                      width: '100%',
                    }}
                  />
                  <Button variant="outline-secondary" className="rounded-0" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>
                    <FaSearch />
                  </Button>
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
