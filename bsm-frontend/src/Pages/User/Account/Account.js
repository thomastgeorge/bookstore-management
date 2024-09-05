import React, { useContext } from 'react'
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { FaShoppingCart, FaBoxOpen, FaUser, FaStar, FaAddressCard, FaPhone } from 'react-icons/fa';

const Account = () => {
    const currentPageUrl = window.location.href;
    localStorage.setItem('currentPageUrl', currentPageUrl);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect to login if user is not logged in
    const handleCardClick = (path) => {
        if (!user) {
            navigate('/login'); // Redirect to login page
        } else {
            navigate(path); // Redirect to the respective page
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex align-items-center mb-4 mx-4">
                <div className="mr-5">
                    {user ? <InitialsAvatar name={user.name} /> : <InitialsAvatar name="User" />}
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <h2 className="font-weight-bold" style={{ fontSize: '2rem' }}>
                        {user ? `Hello ${user.name},` : ' User'}
                    </h2>
                </div>
            </div>
            <div className="row mt-5 justify-content-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="col-md-4 mb-4">
                    <div className="card" onClick={() => handleCardClick('/account/cart')}>
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
                    <div className="card" onClick={() => handleCardClick('/account/orders')}>
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
                    <div className="card" onClick={() => handleCardClick('/account/profile')}>
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
                    <div className="card" onClick={() => handleCardClick('/account/reviews')}>
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
                    <div className="card" onClick={() => handleCardClick('/account/address')}>
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
                    <div className="card" onClick={() => handleCardClick('/contact')}>
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
