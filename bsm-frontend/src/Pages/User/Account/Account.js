import React, { useContext } from 'react'
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import {
    FaShoppingCart,
    FaBoxOpen,
    FaUser,
    FaStar,
    FaAddressCard,
    FaPhone 
} from 'react-icons/fa';
import { 
    PageWrapper,
    HeaderWrapper,
    AvatarWrapper,
    AllCardWrapper,
    CardWrapper,
    CardBodyWrapper,
    TextWrapper
} from './AccountStyle.js'
import Text from '../../../Components/Atoms/Text.js';
import Button from '../../../Components/Atoms/Button.js';
import InitialsAvatar from '../../../Containers/InitialsAvatar/InitialsAvatar.js'

const cardData = [
    {
        title: 'My Cart',
        subtitle: 'View Cart',
        icon: <FaShoppingCart size={24} className="mr-3" />,
        path: '/account/cart'
    },
    {
        title: 'My Orders',
        subtitle: 'View Orders',
        icon: <FaBoxOpen size={24} className="mr-3" />,
        path: '/account/orders'
    },
    {
        title: 'My Profile',
        subtitle: 'Edit Profile',
        icon: <FaUser size={24} className="mr-3" />,
        path: '/account/profile'
    },
    {
        title: 'My Reviews',
        subtitle: 'Edit Reviews',
        icon: <FaStar size={24} className="mr-3" />,
        path: '/account/reviews'
    },
    {
        title: 'My Address',
        subtitle: 'Edit Address',
        icon: <FaAddressCard size={24} className="mr-3" />,
        path: '/account/address'
    },
    {
        title: 'Contact Us',
        subtitle: 'Contact Info',
        icon: <FaPhone size={24} className="mr-3" />,
        path: '/contact'
    }
];

const Account = () => {
    const currentPageUrl = window.location.href;
    localStorage.setItem('currentPageUrl', currentPageUrl);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        if (!user) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <PageWrapper>
            <HeaderWrapper >
                <AvatarWrapper>
                    {user ? <InitialsAvatar name={user.name} /> : <InitialsAvatar name="User" />}
                </AvatarWrapper>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: '3.2vw',
                        margin: '1px'
                    }}
                >
                    {user ? `Hello ${user.name},` : ' User'}
                </Text>
            </HeaderWrapper>
            <AllCardWrapper>
            {cardData.map((card, index) => (
                <CardWrapper key={index}>
                    <Button
                        style={{
                            borderRadius: "8px",
                            height: '5rem',
                            width: '100%',
                            padding: '11px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            margin: '10px',
                            textAlign: 'left',
                        }}
                        onClick={() => handleCardClick(card.path)}
                    >
                        <CardBodyWrapper>
                            {card.icon}
                            <TextWrapper>
                                <Text
                                    style={{
                                        margin: '0 4px 0 20px',
                                        fontWeight: "bold",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {card.title}
                                </Text>
                                <Text
                                    style={{
                                        color: '#6c757d',
                                        margin: '0 4px 0 20px',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {card.subtitle}
                                </Text>
                            </TextWrapper>
                        </CardBodyWrapper>
                    </Button>
                </CardWrapper>
            ))}
            </AllCardWrapper>
        </PageWrapper>
    );
};

export default Account;
