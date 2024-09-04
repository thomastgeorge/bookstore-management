import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Button,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  FormGroup,
  CardSubtitle,
} from "reactstrap";
import { Rating } from "react-simple-star-rating";
import axios from "../../Service/Axios"; 
import './SingleBook.css';

const SingleBook = ({ bookId, addToBasket, token }) => {
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState({ stars: 0, count: 0 });
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/v1/book/9`);
        const fetchedBook = response.data;
        setBook(fetchedBook);
        setRating({ stars: fetchedBook.avgRating, count: fetchedBook.review.length });
        setDescription(fetchedBook.description);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  const quantityOptions = Array.from(Array(book.quantity).keys()).map(num => num + 1);

  return (
    <div className="product-details">
      <Row>
        <Col sm="12" md="4">
          <div className="image-wrapper">
            <CardImg
              left="true"
              width="100%"
              src={book.cover} // Adjust if cover URL needs to be processed
              alt={book.title}
            />
          </div>
        </Col>
        <Col sm="12" md="6">
          <CardBody>
            <CardTitle>{book.title}</CardTitle>
            <CardText>{description}</CardText>
            <div className="rating">
              <Rating
                allowFraction
                readonly
                size={24}
                initialValue={rating.stars}
              />
              <span>{`${rating.count > 1 ? `${rating.count} ratings` : `${rating.count} rating`}`}</span>
            </div>
            <CardSubtitle>
              <strong>Price: £{book.price.toFixed(2)}</strong>
            </CardSubtitle>
            <CardSubtitle>{book.available ? `${book.quantity} items Left` : "Out of stock"}</CardSubtitle>
            <FormGroup className="quantity">
              <Label for="exampleSelect">Selected quantity</Label>
              <Input
                value={selectedQuantity}
                type="select"
                name="quantity"
                id="exampleSelect"
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              >
                {quantityOptions.map((number) => (
                  <option key={number}>{number}</option>
                ))}
              </Input>
            </FormGroup>
            <Button
              color="primary"
              onClick={() =>
                addToBasket({
                  ...book,
                  description,
                  quantity: selectedQuantity,
                  imageUrl: book.cover,
                })
              }
            >
              Add to basket
            </Button>
          </CardBody>
        </Col>
      </Row>
    </div>
  );
};

export default SingleBook;
