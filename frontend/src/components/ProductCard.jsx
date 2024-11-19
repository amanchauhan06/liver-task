import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl, viewedAt } = product;

  return (
    <div className="product-card">
      <a href={`/products/${id}`} className="product-link">
        <div className="product-image">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="product-info">
          <h3>{name}</h3>
          <p className="price">${price.toFixed(2)}</p>
          <p className="viewed-at">
            Viewed: {new Date(viewedAt).toLocaleDateString()}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;