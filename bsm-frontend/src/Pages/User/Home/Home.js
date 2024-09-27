import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import ProductCard from '../../../Components/Books/ProductCard';
import callAPI from '../../../Util/callApi';
import config from  '../../../Util/config';


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
  const currentPageUrl = window.location.href;
  localStorage.setItem('currentPageUrl', currentPageUrl);
  
  const [newArrivals, setNewArrivals] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [loadingNA, setLoadingNA] = useState(true);
  const [errorNA, setErrorNA] = useState(null);
  const [loadingBS, setLoadingBS] = useState(true);
  const [errorBS, setErrorBS] = useState(null);
  const [loadingTR, setLoadingTR] = useState(true);
  const [errorTR, setErrorTR] = useState(null);
  

  const newArrivalsRef = useRef(null);
  const bestSellingRef = useRef(null);
  const topRatedRef = useRef(null); 

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        let url = config.api.book.newArrivals;
        let response = await callAPI.get(url);
        setNewArrivals(response.data);
        setLoadingNA(false);
      } catch (err) {
        setErrorNA(err.message);
        setLoadingNA(false);
      }
    };

    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const fetchTopRated = async () =>{
      try {
        let url = config.api.book.topRated;
        let response = await callAPI.get(url);
        setTopRated(response.data);
        setLoadingTR(false);
      } catch (err) {
        setErrorTR(err.message);
        setLoadingTR(false);
      }
    };

    fetchTopRated();
  }, []);

  useEffect(() => {
    const fetchBestSelling = async () =>{
      try {
        // by-default limit is 8 to change sent limit as request param
        let url = config.api.book.bestSelling;
        let response = await callAPI.get(url);
        setBestSelling(response.data);
        setLoadingBS(false);
      } catch (err) {
        setErrorBS(err.message);
        setLoadingBS(false);
      }
    };

    fetchBestSelling();
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
          </Col>
          <Col xs={12} style={{ position: 'relative' }}>
            {loadingNA ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}>
                <Spinner animation="border" />
              </div>
            ) : errorNA ? (
              <div className="text-center text-danger">
                <p>Error loading new arrivals: {errorNA}</p>
              </div>
            ) : (
              <Slider ref={newArrivalsRef} {...settings}>
                {newArrivals.map((book) => (
                  <Col key={book.pid} xs={12} sm={6} md={4} lg={3} className="mb-1">
                  <ProductCard book={book} />
                </Col>
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

        {bestSelling.length>0 ?
          <Row className='my-4'>
            <Col xs={12} className='d-flex justify-content-between align-items-center'>
              <h3>Best Selling Books</h3>
            </Col>
            <Col xs={12} style={{ position: 'relative' }}>
              {loadingBS ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}>
                    <Spinner animation="border" />
                  </div>
                ) : errorBS ? (
                  <div className="text-center text-danger">
                    <p>Error loading Best Sellings: {errorBS}</p>
                  </div>
                ) : (
                  <Slider ref={bestSellingRef} {...settings}>
                    {bestSelling.map((book) => (
                      <Col key={book.pid} xs={12} sm={6} md={4} lg={3} className="mb-1">
                      <ProductCard book={book} />
                    </Col>
                    ))}
                  </Slider>
                )}
              <button
                onClick={() => handlePrevClick(bestSellingRef)}
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
                onClick={() => handleNextClick(bestSellingRef)}
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
        : null}

        <Row className='my-4'>
          <Col xs={12} className='d-flex justify-content-between align-items-center'>
            <h3>Top Rated</h3>
          </Col>
          <Col xs={12} style={{ position: 'relative' }}>
          {loadingTR ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}>
                <Spinner animation="border" />
              </div>
            ) : errorNA ? (
              <div className="text-center text-danger">
                <p>Error loading Top Rated Book: {errorTR}</p>
              </div>
            ) : (
              <Slider ref={topRatedRef} {...settings}>
                {topRated.map((book) => (
                  <Col key={book.pid} xs={12} sm={6} md={4} lg={3} className="mb-1">
                  <ProductCard book={book} />
                </Col>
                ))}
              </Slider>
            )}
            <button
              onClick={() => handlePrevClick(topRatedRef)}
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
              onClick={() => handleNextClick(topRatedRef)}
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
      </Container>
    </div>
  );
};

export default Home;
