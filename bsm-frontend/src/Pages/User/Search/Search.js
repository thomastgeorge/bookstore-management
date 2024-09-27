import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from '../../../Service/Axios';
import Spinner from 'react-bootstrap/Spinner';
import ProductCard from '../../../Components/Books/ProductCard';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';
import config from '../../../Util/config';
import callAPI from '../../../Util/callApi';

const Search = () => {
  const currentPageUrl = window.location.href;
  localStorage.setItem('currentPageUrl', currentPageUrl);

  const { user } = useContext(UserContext)
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';
  const category = queryParams.get('category') || null;
  const minPrice = queryParams.get('minPrice') || null;
  const maxPrice = queryParams.get('maxPrice') || null;

  useEffect (() => {
    const searchBook = async() => {
      try{
        setLoading(true);
        setError(null);

        let url = config.api.book.search
          .replace("{{role}}", "USER");
        let params= { query, category, minPrice, maxPrice};
        let response = await callAPI.get(url, params);
        
        setSearchResults(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch{
        setError('Error fetching search results. Please try again later.');
        setLoading(false);
      }
    }
    searchBook();
  }, [location.search])

  return (
    <div className="container mt-4" >
      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>Search Results for: {query}</h2>
          <Container>
            <Row>
              {searchResults.length > 0 ? (
                searchResults.map(book => (
                  <Col key={book.pid} xs={12} sm={6} md={4} lg={3} className="mb-1">
                    <ProductCard book={book} />
                  </Col>
                ))
              ) : (
                <p>No results found. Try a different search term.</p>
              )}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Search;
