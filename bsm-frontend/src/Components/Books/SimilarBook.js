import React from "react";
import ProductCard from "./SimilarProductCard";

const SimilarBook = ({ title, products }) => (
  <div className="container mt-8 mx-auto px-4 dark:bg-slate-800">
    <div className="sm:flex items-center justify-between">
      <h2 className="text-4xl font-medium font-lora dark:text-white">{title}</h2>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          book={product} // Pass the whole book object
        />
      ))}
    </div>
  </div>
);

export default SimilarBook;
