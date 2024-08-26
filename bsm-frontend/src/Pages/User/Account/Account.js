import React from 'react'
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';

import { FaShoppingCart, FaBoxOpen, FaUser, FaStar, FaAddressCard, FaPhone } from 'react-icons/fa';

const Account = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <div className="mr-5">
          <InitialsAvatar name="User 1" />
        </div>
        <div>
          <h2 className="font-weight-bold" style={{ fontSize: '2rem' }}>Hello User 1,</h2>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaShoppingCart size={24} className="mr-3" />
              <div className="mx-4">
                <h5 className="mb-1">My Cart</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>View Cart</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaBoxOpen size={24} className="mr-3" />
              <div className="mx-4">
                <h5 className="mb-1">My Orders</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>View Orders</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaUser size={24} className="mr-3" />
              <div className="mx-4">
                <h5 className="mb-1">My Profile</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Edit Profile</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaStar size={24} className="mr-3" />
              <div className="mx-4">
                <h5 className="mb-1">My Reviews</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Edit Reviews</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaAddressCard size={24} className="mr-3" />
              <div className="mx-4">
                <h5 className="mb-1">My Address</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Edit Address</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body d-flex align-items-center">
              <FaPhone size={24} className="mr-3" />
              <div className="mx-4">
                <h5 className="mb-1">Contact Us</h5>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Contact Info</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;


