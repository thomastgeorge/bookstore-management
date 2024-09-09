import React, { useState, useEffect, useContext } from 'react';
import axios from '../../../Service/Axios.js'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { UserContext } from '../../../App.js'
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useContext(UserContext)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/v1/order/customer/${user.customerId}`);
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewBook = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <h1 className="my-4">Order List</h1>
      {orders.map(order => (
        <Card key={order.orderId} className="mb-4">
          <Card.Body>
            <Card.Title>Order ID: {order.orderId}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Date: {new Date(order.orderDate).toLocaleDateString()} | Total: ₹{order.totalTotal}
            </Card.Subtitle>
            <Card.Text>
              <strong>Address:</strong> {order.address.address}, {order.address.city}, {order.address.country}, {order.address.pincode}
            </Card.Text>
            <Row>
              {order.bookorder.map(({ book, quantity, subTotal }) => (
                <Col md={4} key={book.bookId}>
                  <Card className="mb-3">
                    <Row noGutters>
                      <Col xs={4}>
                        <Card.Img
                          variant="top"
                          src={book.cover}
                          alt={book.title}
                          style={{ width: '100px', height: '150px', cursor: 'pointer' }}
                          onClick={() => handleViewBook(book.bookId)}
                        />
                      </Col>
                      <Col xs={8}>
                        <Card.Body>
                          <Card.Title>{book.title}</Card.Title>
                          <Card.Text>
                            <strong>Author:</strong> {book.author}<br />
                            <strong>Price:</strong> ₹{book.price}<br />
                            <strong>Quantity:</strong> {quantity}<br />
                            <strong>Subtotal:</strong> ₹{subTotal}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Orders;
