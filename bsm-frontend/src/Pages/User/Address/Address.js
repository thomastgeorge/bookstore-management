import React, { useState, useEffect, useContext } from 'react';
import Axios from '../../../Service/Axios';
import { Button, Container, Row, Col, Form, ListGroup, Alert } from 'react-bootstrap';
import { UserContext } from '../../../App';

const Address = () => {
  const { user } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: '', city: '', country: '', pincode: '' });
  const [editAddress, setEditAddress] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [errorMessages, setErrorMessages] = useState({
    address: '',
    city: '',
    country: '',
    pincode: ''
  });

  useEffect(() => {
    if (user && user.customerId) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await Axios.get(`api/v1/address/customerId/${user.customerId}`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const validateAddress = (address) => {
    let valid = true;
    const errors = { address: '', city: '', country: '', pincode: '' };

    if (!address.address) {
      errors.address = 'Address is required.';
      valid = false;
    }
    if (!address.city) {
      errors.city = 'City is required.';
      valid = false;
    }
    if (!address.country) {
      errors.country = 'Country is required.';
      valid = false;
    }
    if (!address.pincode) {
      errors.pincode = 'Pincode is required.';
      valid = false;
    }

    setErrorMessages(errors);
    return valid;
  };

  const handleAddAddress = async () => {
    if (!validateAddress(newAddress)) return;

    try {
      await Axios.post(`api/v1/address/create/${user.customerId}`, {
        addressId: null,
        ...newAddress,
        customer: null,
      });
      setNewAddress({ address: '', city: '', country: '', pincode: '' });
      setShowAddForm(false);
      fetchAddresses();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleEditAddress = async () => {
    if (!editAddress || !validateAddress(editAddress)) return;

    try {
      await Axios.put(`api/v1/address/update/${user.customerId}`, {
        addressId: editAddress.addressId,
        ...editAddress,
      });
      setEditAddress(null);
      fetchAddresses();
    } catch (error) {
      console.error('Error editing address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await Axios.delete(`api/v1/address/${addressId}`);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h1>Manage Addresses</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {addresses.map((address) => (
              <ListGroup.Item key={address.addressId} className="d-flex justify-content-between align-items-center">
                <div>
                  <div><strong>Address:</strong> {address.address}</div>
                  <div><strong>City:</strong> {address.city}</div>
                  <div><strong>State, Country:</strong> {address.country}</div>
                  <div><strong>Pincode:</strong> {address.pincode}</div>
                </div>
                <div>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => setEditAddress(address)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAddress(address.addressId)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          {!showAddForm ? (
            <Button variant="primary" onClick={() => setShowAddForm(true)}>
              Add Address
            </Button>
          ) : (
            <>
              <h3 className='my-5'>Add Address</h3>
              <Form>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errorMessages.address}
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.address}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errorMessages.city}
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formCountry">
                  <Form.Label>State, Country</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errorMessages.country}
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.country}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errorMessages.pincode}
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.pincode}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" onClick={handleAddAddress}>
                  Add Address
                </Button>
                <Button variant="secondary" onClick={() => setShowAddForm(false)} className="ms-2">
                  Cancel
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>

      {editAddress && (
        <Row className="mt-3">
          <Col>
            <h2>Edit Address</h2>
            <Form>
              <Form.Group controlId="formEditAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errorMessages.address}
                  value={editAddress.address}
                  onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.address}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEditCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errorMessages.city}
                  value={editAddress.city}
                  onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEditCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errorMessages.country}
                  value={editAddress.country}
                  onChange={(e) => setEditAddress({ ...editAddress, country: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.country}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEditPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errorMessages.pincode}
                  value={editAddress.pincode}
                  onChange={(e) => setEditAddress({ ...editAddress, pincode: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.pincode}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" onClick={handleEditAddress}>
                Update Address
              </Button>
              <Button variant="secondary" onClick={() => setEditAddress(null)} className="ms-2">
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Address;
