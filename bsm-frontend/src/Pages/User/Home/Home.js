import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import Axios from '../../../Service/Axios'

const settings = {
  dots: false,
  infinite: false, // Disable infinite looping
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <div />, // Custom arrows will be controlled manually
  nextArrow: <div />, // Custom arrows will be controlled manually
  responsive: [
    {
      breakpoint: 992, // Tablet
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // Mobile
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const newArrivalsRef = useRef(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await Axios.get('api/v1/book/new-arrivals/8');
        setNewArrivals(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const handlePrevClick = (ref) => {
    if (ref.current) {
      ref.current.slickPrev();
    }
  };

  const handleNextClick = (ref) => {
    if (ref.current) {
      ref.current.slickNext();
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Row>
        <Col xs={12}>
          <div style={{ position: 'relative' }}>
            <img
              src='slide.png'
              alt='Slide'
              style={{
                width: '100%',
                maxHeight: '90vh',
                margin: '0 auto',
              }}
            />
          </div>
        </Col>
      </Row>

      <Container>
        <Row className='my-3'>
          <Col xs={12} className='d-flex justify-content-between align-items-center'>
            <h3>New Arrivals</h3>
            <Button
              variant='link'
              style={{
                color: 'black',
                textDecoration: 'none'
              }}
            >
              View All
            </Button>
          </Col>
          <Col xs={12} style={{ position: 'relative' }}>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}>
                <Spinner animation="border" />
              </div>
            ) : error ? (
              <div className="text-center text-danger">
                <p>Error loading new arrivals: {error}</p>
              </div>
            ) : (
              <Slider ref={newArrivalsRef} {...settings}>
                {newArrivals.map((book) => (
                  <div key={book.pid} className='px-2'>
                    <Card style={{ width: '100%', height: '100%' }}>
                      <Card.Img
                        variant='top'
                        src={book.img}
                        style={{
                          width: '100%',
                          height: '350px',
                          objectFit: 'cover'
                        }}
                      />
                      <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '85px' }}>
                        <Card.Title style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          marginBottom: 'auto'
                        }}>
                          {book.title}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            )}
            <button
              onClick={() => handlePrevClick(newArrivalsRef)}
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <FaChevronLeft size={30} />
            </button>
            <button
              onClick={() => handleNextClick(newArrivalsRef)}
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <FaChevronRight size={30} />
            </button>
          </Col>
        </Row>

        {/* The other sections (Best Selling Books, Most Favoured) remain unchanged */}
      </Container>
    </div>
  );
};

export default Home;
