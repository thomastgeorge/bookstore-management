import { useState, useEffect } from "react";
import { Grid, Typography, Button, CircularProgress, TextField, FormControlLabel, Checkbox, Divider } from "@mui/material";
import ProductCard from "./ProductCard"; // Updated component
import axios from '../../Service/Axios';

const AllBooks = () => {
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(9);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: [], minPrice: '', maxPrice: '' });

  useEffect(() => {
    // Fetch books from API
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/v1/book');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleLoadMore = () => {
    window.scrollTo({
      top: window.scrollY - 1500,
      behavior: "smooth",
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayedItems(displayedItems + 9);
    }, 2000);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'category') {
      setFilters((prev) => ({
        ...prev,
        category: checked 
          ? [...prev.category, value]
          : prev.category.filter((cat) => cat !== value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredBooks = books.filter((book) => {
    const inCategory = filters.category.length === 0 || filters.category.includes(book.category.categoryName); // Adjusted
    const withinPriceRange = (
      (!filters.minPrice || book.price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || book.price <= parseFloat(filters.maxPrice))
    );
    return inCategory && withinPriceRange;
  });

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error loading books
      </Typography>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-12 px-4 sm:px-6 lg:px-8">
      <div className="md:w-1/4 lg:w-1/5 p-4 bg-white border rounded-lg shadow-md">
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>
          Category
        </Typography>
        {['Fiction', 'Adventure', 'Action'].map(category => (
          <FormControlLabel
            key={category}
            control={<Checkbox checked={filters.category.includes(category)} onChange={handleFilterChange} value={category} name="category" />}
            label={category}
          />
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <TextField
          label="Min Price"
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Max Price"
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          variant="outlined"
          fullWidth
        />
      </div>

      <div className="md:w-3/4 lg:w-4/5 p-4">
        <Typography variant="h3" align="center" gutterBottom>
          All Books
        </Typography>
        <Grid container spacing={4}>
          {loading
            ? Array.from({ length: displayedItems }).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <div className="flex justify-center items-center h-full">
                    <CircularProgress />
                  </div>
                </Grid>
              ))
            : filteredBooks.slice(0, displayedItems).map((book) => (
                <Grid item key={book.bookId} xs={12} sm={6} md={4}>
                  <ProductCard
                    id={book.bookId}
                    price={book.price}
                    thumbnail={book.thumbnail}
                    title={book.title}
                    category={book.category.categoryName} // Adjusted
                    rating={book.avgRating}
                  />
                </Grid>
              ))}
        </Grid>
        {displayedItems < filteredBooks.length && (
          <div className="text-center mt-6">
            <Button
              onClick={handleLoadMore}
              variant="outlined"
              color="primary"
              className="py-2 px-6"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
