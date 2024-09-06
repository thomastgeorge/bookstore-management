import React, { useEffect, useState } from 'react';
import axios from '../../../Service/Axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from 'mdb-react-ui-kit';

// Inline CSS
const styles = {
  section: {
    backgroundColor: "#eee",
  },
  card: {
    borderRadius: "15px",
  },
  bgGrey: {
    backgroundColor: "#eae8e8",
  },
  select: {
    padding: "0.5em",
    borderRadius: "0.25em",
    backgroundColor: "#eae8e8",
  },
  selectInput: {
    fontSize: "1rem",
    lineHeight: "2.15",
    paddingLeft: "0.75em",
    paddingRight: "0.75em",
  },
  cardRegistration2BgGrey: {
    borderTopRightRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  cardRegistration2BgGreyMobile: {
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  },
};

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [shippingCost, setShippingCost] = useState(5);
    const [selectedDelivery, setSelectedDelivery] = useState("1"); // Default to Standard Delivery

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/v1/cart/customer');
                setCartItems(response.data);
            } catch (err) {
                setError('Error fetching cart items.');
                console.error('Error fetching cart items:', err);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (cartId, quantity) => {
        // Validate quantity
        if (quantity < 1) return;

        // Update quantity in state but not on the server immediately
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.cartId === cartId ? { ...item, quantity } : item
            )
        );
    };

    const handleQuantitySave = async () => {
        try {
            // Update quantity on the server
            await Promise.all(
                cartItems.map(item => 
                    axios.put(`/api/v1/cart/${item.cartId}/${item.quantity}`)
                )
            );
        } catch (err) {
            setError('Error saving cart item quantities.');
            console.error('Error saving cart item quantities:', err);
        }
    };

    const handleRemoveItem = async (cartId) => {
        try {
            await axios.delete(`/api/v1/cart/${cartId}`);
            // Refresh the cart items after removal
            const response = await axios.get('/api/v1/cart/customer');
            setCartItems(response.data);
        } catch (err) {
            setError('Error removing cart item.');
            console.error('Error removing cart item:', err);
        }
    };

    const handleCheckout = async () => {
        try {
            await handleQuantitySave(); // Save quantities before proceeding
            await axios.post('/api/v1/cart/checkout');
            setCartItems([]);
            alert('Proceeding to checkout!');
        } catch (err) {
            setError('Error processing checkout.');
            console.error('Error processing checkout:', err);
        }
    };

    const handleDeliveryChange = (e) => {
        const value = e.target.value;
        setSelectedDelivery(value);
        switch (value) {
            case "1":
                setShippingCost(5);
                break;
            case "2":
                setShippingCost(10);
                break;
            case "3":
                setShippingCost(20);
                break;
            default:
                setShippingCost(5);
                break;
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
    };

    return (
        <section className="h-100 h-custom" style={styles.section}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className="card-registration card-registration-2" style={styles.card}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                                                    Shopping Cart
                                                </MDBTypography>
                                                <MDBTypography className="mb-0 text-muted">
                                                    {cartItems.length} items
                                                </MDBTypography>
                                            </div>
                                            {error && <p className="text-red-500">{error}</p>}
                                            <hr className="my-4" />
                                            {cartItems.map(item => (
                                                <MDBRow key={item.cartId} className="mb-4 d-flex justify-content-between align-items-center">
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        <MDBCardImage
                                                            src={item.book.cover}
                                                            fluid
                                                            className="rounded-3"
                                                            alt={item.book.title}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted">
                                                            {item.book.title}
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0">
                                                            {item.book.author}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                        <MDBBtn color="link" className="px-2" onClick={() => handleQuantityChange(item.cartId, Math.max(item.quantity - 1, 1))}>
                                                            <MDBIcon fas icon="minus" />
                                                        </MDBBtn>
                                                        <MDBInput 
                                                            type="number" 
                                                            min="1" 
                                                            value={item.quantity} 
                                                            size="sm" 
                                                            onChange={(e) => handleQuantityChange(item.cartId, parseInt(e.target.value))} 
                                                        />
                                                        <MDBBtn color="link" className="px-2" onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}>
                                                            <MDBIcon fas icon="plus" />
                                                        </MDBBtn>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                        <MDBTypography tag="h6" className="mb-0">
                                                            € {item.book.price * item.quantity}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                        <a href="#!" className="text-muted" onClick={() => handleRemoveItem(item.cartId)}>
                                                            <MDBIcon fas icon="times" />
                                                        </a>
                                                    </MDBCol>
                                                </MDBRow>
                                            ))}
                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="#!" className="text-body">
                                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back to shop
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="4" style={styles.bgGrey}>
                                        <div className="p-5">
                                            <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Summary
                                            </MDBTypography>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <MDBTypography tag="h5" className="text-uppercase">
                                                    items {cartItems.length}
                                                </MDBTypography>
                                                <MDBTypography tag="h5">€ {calculateTotal().toFixed(2)}</MDBTypography>
                                            </div>
                                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                Shipping
                                            </MDBTypography>
                                            <div className="mb-4 pb-2">
                                                <select 
                                                    className="select p-2 rounded" 
                                                    style={styles.select} 
                                                    value={selectedDelivery} 
                                                    onChange={handleDeliveryChange}
                                                >
                                                    <option value="1">Standard-Delivery- €5.00</option>
                                                    <option value="2">Two-Day Delivery - €10.00</option>
                                                    <option value="3">Next-Day Delivery - €20.00</option>
                                                </select>
                                            </div>
                                            <MDBTypography tag="h5" className="text-uppercase mb-3">
                                                Total
                                            </MDBTypography>
                                            <MDBTypography tag="h5" className="text-end">
                                                € {(calculateTotal() + shippingCost).toFixed(2)}
                                            </MDBTypography>
                                            <hr className="my-4" />
                                            <MDBBtn color="primary" block onClick={handleCheckout}>
                                                Proceed to checkout
                                            </MDBBtn>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default Cart;
