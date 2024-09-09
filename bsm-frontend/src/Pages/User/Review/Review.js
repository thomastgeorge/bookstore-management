import React, { useState, useEffect } from 'react';
import Axios from '../../../Service/Axios';
import { Button, Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';  // Import Rating component

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [errorMessages, setErrorMessages] = useState({ headline: '', comment: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await Axios.get('api/v1/review/customer');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const validateReview = (review) => {
    let valid = true;
    const errors = { headline: '', comment: '' };

    if (!review.headLine) {
      errors.headline = 'Headline is required.';
      valid = false;
    }
    if (!review.comment) {
      errors.comment = 'Comment is required.';
      valid = false;
    }

    setErrorMessages(errors);
    return valid;
  };

  const handleEditReview = async () => {
    if (!editReview || !validateReview(editReview)) return;

    try {
      await Axios.put('api/v1/review', editReview);
      setEditReview(null);
      fetchReviews();
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await Axios.delete(`api/v1/review/${reviewId}`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleViewBook = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleRatingChange = (event, newRating) => {
    setEditReview({ ...editReview, rating: newRating });
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h1>Manage Reviews</h1>
        </Col>
      </Row>

      {reviews.length === 0 ? (
        <Row>
          <Col className='d-flex my-5 justify-content-between align-items-center'>
            <p>You have not reviewed any books.</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <ListGroup>
              {reviews.map((review) => (
                <ListGroup.Item key={review.reviewId} className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={review.book.cover}
                      alt={review.book.title}
                      style={{ width: '50px', height: '75px', marginRight: '1rem', cursor: 'pointer' }}
                      onClick={() => handleViewBook(review.book.bookId)}
                    />
                    <div>
                      <div><strong>Book:</strong> {review.book.title}</div>
                      <div><strong>Headline:</strong> {review.headLine}</div>
                      <div><strong>Comment:</strong> {review.comment}</div>
                      <div><strong>Rating:</strong> {review.rating && <Rating name="read-only" value={review.rating} readOnly />}</div>
                      <div><strong>Reviewed On:</strong> {review.reviewedOn}</div>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => setEditReview(review)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteReview(review.reviewId)}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}

      {editReview && (
        <Row className="mt-3">
          <Col>
            <h2>Edit Review</h2>
            <Form>
              <Form.Group controlId="formEditHeadLine">
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  type="text"
                  isInvalid={!!errorMessages.headline}
                  value={editReview.headLine}
                  onChange={(e) => setEditReview({ ...editReview, headLine: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.headline}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEditComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  isInvalid={!!errorMessages.comment}
                  value={editReview.comment}
                  onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  {errorMessages.comment}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEditRating">
                <Form.Label>Rating</Form.Label>
                <Rating
                  name="edit-review-rating"
                  value={editReview.rating || 0}
                  onChange={handleRatingChange}
                  size="large"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleEditReview}>
                Update Review
              </Button>
              <Button variant="secondary" onClick={() => setEditReview(null)} className="ms-2">
                Cancel
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Review;
