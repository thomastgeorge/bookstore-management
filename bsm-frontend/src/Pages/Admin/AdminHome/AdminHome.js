// src/components/AdminHome.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Axios from '../../../Service/Axios';

const AdminHome = () => {
  const [data, setData] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalBooks: 0,
    todaysOrders: 0,
    todaysRevenue: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await Axios.get('/api/v1/customer/count');
        const totalCustomers = customerResponse.data;

        const orderResponse = await Axios.get('/api/v1/order/count');
        const totalOrders = orderResponse.data;

        const todaysOrderResponse = await Axios.get('/api/v1/order/todays/count');
        const todaysOrders = todaysOrderResponse.data;

        const todaysRevenueResponse = await Axios.get('/api/v1/order/todays/revenue');
        let todaysRevenue = todaysRevenueResponse.data;
        if (todaysRevenue===""){
          todaysRevenue=0
        }

        const totalRevenueResponse = await Axios.get('/api/v1/order/total/revenue');
        const totalRevenue = totalRevenueResponse.data;

        const bookResponse = await Axios.get('/api/v1/book/count');
        const totalBooks = bookResponse.data;

        setData({
          totalCustomers,
          totalOrders,
          totalBooks,
          todaysOrders,
          todaysRevenue,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex">
      <Container className="mt-4 ml-3">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Customers</Card.Title>
                <Card.Text>{data.totalCustomers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Orders</Card.Title>
                <Card.Text>{data.totalOrders}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Books</Card.Title>
                <Card.Text>{data.totalBooks}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Today's Orders</Card.Title>
                <Card.Text>{data.todaysOrders}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Today's Revenue</Card.Title>
                <Card.Text>₹{data.todaysRevenue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
                <Card.Text>₹{data.totalRevenue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminHome;
