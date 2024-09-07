import React, { useEffect, useState } from 'react';
import axios from '../../../Service/Axios';
import { 
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Container, 
    Grid, 
    IconButton, 
    Input, 
    Select, 
    MenuItem 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    quantityControl: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem', // Adds space between buttons and input
    },
    quantityInput: {
        width: '4rem',
        textAlign: 'center',
        margin: '0 0.5rem', // Adds space between buttons and input
    },
    button: {
        flexShrink: 0, // Prevents the button from expanding
        padding: '0.5rem 1rem',
    }
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

        try {
            // Update quantity on the server
            await axios.put(`/api/v1/cart/${cartId}/${quantity}`);
            
            // Update quantity in state
            setCartItems(prevItems => 
                prevItems.map(item => 
                    item.cartId === cartId ? { ...item, quantity } : item
                )
            );
        } catch (err) {
            setError('Error updating cart item quantity.');
            console.error('Error updating cart item quantity:', err);
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
            <Container maxWidth="false" className="py-7  h-100">
                <Grid container spacing={4} justifyContent="center" alignItems="center" className="h-100">
                    <Grid item xs={12}>
                        <Card className="card-registration card-registration-2" style={styles.card}>
                            <CardContent className="p-0">
                                <Grid container spacing={0} className="g-0">
                                    <Grid item lg={8}>
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <Typography variant="h3" className="fw-bold mb-0 text-black">
                                                    Shopping Cart
                                                </Typography>
                                                <Typography className="mb-0 text-muted">
                                                    {cartItems.length} items
                                                </Typography>
                                            </div>
                                            {error && <p className="text-red-500">{error}</p>}
                                            <hr className="my-4" />
                                            {cartItems.map(item => (
                                                <Grid container spacing={2} key={item.cartId} className="mb-4 d-flex justify-content-between align-items-center">
                                                    <Grid item md={2} lg={2} xl={2}>
                                                        <CardMedia
                                                            component="img"
                                                            image={item.book.cover}
                                                            alt={item.book.title}
                                                            style={{ borderRadius: '0.25rem' }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={3} lg={3} xl={3}>
                                                        <Typography variant="h6" className="text-black">
                                                            {item.book.title}
                                                        </Typography>
                                                        <Typography variant="subtitle2" className="text-muted mb-0">
                                                            {item.book.author}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={3} lg={3} xl={3} className="d-flex align-items-center">
                                                        <div style={styles.quantityControl}>
                                                    <Button
                                                      variant="contained"
                                                      style={{
                                                        ...styles.button,
                                                        padding: '0.25rem 0.25rem',
                                                        backgroundColor: 'black', 
                                                        color: 'white'
                                                      }}
                                                      onClick={() => handleQuantityChange(item.cartId, Math.max(item.quantity - 1, 1))}
                                                    >
                                                      <RemoveIcon style={{ color: 'white' }} /> {/* Set icon color to white */}
                                                    </Button>

                                                            <Input 
                                                                type="number" 
                                                                min="1" 
                                                                value={item.quantity} 
                                                                readOnly 
                                                                style={{  ...styles.quantityInput}}
                                                            />
                                                    <Button
                                                      variant="contained"
                                                      color="default"
                                                      style={{
                                                        ...styles.button, padding: '0.25rem 0.25rem',
                                                        backgroundColor: 'black',
                                                        color: 'white'
                                                      }}
                                                      onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                                                    >
                                                      <AddIcon />
                                                    </Button>
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={3} lg={2} xl={2} className="text-end">
                                                        <Typography variant="h6" className="mb-0" >
                                                            ₹ {item.book.price * item.quantity} 
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={1} lg={1} xl={1} className="text-end">
                                                        <IconButton 
                                                            color="default"
                                                            style={{ marginLeft: '1rem' }}
                                                            onClick={() => handleRemoveItem(item.cartId)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <Typography variant="h6" className="mb-0">
                                                    <CardContent component="a" href="/" className="text-body">
                                                        <ArrowBackIcon className="me-2" /> Back to shop
                                                    </CardContent>
                                                </Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item lg={4} style={styles.bgGrey}>
                                        <div className="p-5">
                                            <Typography variant="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Summary
                                            </Typography>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4">
                                                <Typography variant="body1" className="text">
                                                    {cartItems.length} Nos.
                                                </Typography>
                                                <Typography variant="body1">₹ {calculateTotal().toFixed(2)}</Typography>
                                            </div>
                                            <Typography variant="body1" className="text-uppercase mb-3">
                                                Shipping
                                            </Typography>
                                            <div className="mb-4 pb-2">
                                                <Select 
                                                    value={selectedDelivery} 
                                                    onChange={handleDeliveryChange}
                                                    displayEmpty
                                                    style={{ ...styles.select, width: '100%' }}
                                                >
                                                    <MenuItem value="1">Standard Delivery - ₹5.00</MenuItem>
                                                    <MenuItem value="2">Two-Day Delivery - ₹10.00</MenuItem>
                                                    <MenuItem value="3">Next-Day Delivery - ₹20.00</MenuItem>
                                                </Select>
                                            </div>
                                            <div className="d-flex justify-content-between mb-4">
                                            <Typography variant="body1" className="text-uppercase mb-3">
                                                Total
                                            </Typography>
                                            <Typography variant="body1" className="text-end">
                                                ₹ {(calculateTotal() + shippingCost).toFixed(2)}
                                            </Typography>
                                            </div>
                                            <hr className="my-4" />
                                            <Button variant="contained" color="primary" style={{ backgroundColor: 'black', color: 'white' }} fullWidth onClick={handleCheckout}>
                                                Proceed to checkout
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Cart;
