import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App.js'
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../Util/config.js';
import callAPI from '../../Util/callApi.js';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const [ recommendation, setRecommendation] = useState([])
  //console.log(user);

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
      setRecommendation([]);
      handleSearch();
    }
  };

  useEffect(() =>{
    let timer = setTimeout(() => {
      const fetchSuggestions = async () => {
      if (searchQuery.length >= 3) {       
          try {
            let url = config.api.book.search
              .replace("{{role}}", "USER");
            let params= { query:searchQuery };
            let response = await callAPI.get(url, params)
            
            setRecommendation(response.data);
          } catch (error) {
          console.error('Error fetching recommendation:', error);
          }
      } else {
          setRecommendation([]);
      }
      };
  
      fetchSuggestions();
  }, 800);

  return () => clearTimeout(timer);
  }, [searchQuery])

  const handleClick = (bookId) => {
    setRecommendation([]);
    nav(`/book/${bookId}`);
  };

  const handleNavbarClick = () => {
    setRecommendation([]);
  };

  return (
    <div>
      <Navbar bg="light" expand="md" className="py-2" onClick={handleNavbarClick}>
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
          <Navbar.Collapse id="basic-navbar-nav" >
            <div className="d-flex flex-md-row align-items-center justify-content-between w-100">
              {/* Centered Search Bar */}
              <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center w-100" style={{ maxWidth: '400px' }}>
                  {user === null || user.role !== "ADMIN" ? (
                    <Form
                      className="d-flex align-items-center w-100"
                      onKeyDown={handleKeyDown}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-0 me-2"
                      />
                       <ul id="autocompleteList" className="list-group position-absolute top-100 w-100 shadow-sm overflow-auto" style={{ zIndex: 999 }}>
                                {recommendation && recommendation.map((recommend) => (
                                <li
                                    key={recommend.bookId}
                                    className="list-group-item w-80"
                                    onClick={(e) => handleClick(recommend.bookId)}
                                    style={{ fontSize: '13px', cursor: 'pointer'}}
                                >
                                    {recommend.title}
                                </li>
                                ))}
                            </ul>
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
                  ) : null}
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
             {user && user.role !== "ADMIN" && (
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
              )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
