import React, { useContext } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Footer = () => {
  const { user } = useContext(UserContext);
  const nav = useNavigate(); // Hook for navigation

  return (
    <footer className="mt-5 pt-5" style={{ background: "#3A4553", color: "white" }}>
      {/* Dashed Line */}
      {/* <div className="border-top border-2 border-dashed" style={{ borderTopStyle: 'dashed' }}></div> */}

      <Container className="pt-4">
        <Row className="justify-content-center text-center">
          {/* Logo and Links Section */}
          <Col md={4} className="mb-4 mt-1 mb-md-0 d-flex flex-column align-items-center">
            <img
              src="logo.png"
              alt="Logo"
              width="80"
              height="65"
              className="mb-2"
            />
            <Nav className="flex-column">
              <Nav.Link
                onClick={() => nav('/')}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Home
              </Nav.Link>
              { user === null || user.role !== "ADMIN" && (
                <Nav.Link
                  onClick={() => nav('/account/orders')}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  My Orders
                </Nav.Link>
              )}
            </Nav>
          </Col>

          {/* Customer Service Section */}
          <Col md={4} className='mt-4' onClick={() => nav('/contact')}>
            <h5 className="font-weight-bold">CUSTOMER SERVICE</h5>
            <p className="mb-1 mt-3">+91 12345-67890</p>
            <p className="mb-1">Bl. No 9, Bellandur</p>
            <p className="mb-1">Bengaluru, Karnataka, India</p>
            <p>560103</p>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="pt-3 my-2 pb-3 justify-content-center">
          <Col className="text-center">
            <small>COPYRIGHT ©2024 Libreria</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
