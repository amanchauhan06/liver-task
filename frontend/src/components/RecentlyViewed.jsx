import React, { useState, useEffect } from 'react';
import { getRecentlyViewed } from '../utils/api';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import '../styles/RecentlyViewed.css';

const RecentlyViewed = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRecentlyViewed(userId);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!products.length) return <div className="no-products">No recently viewed products</div>;

  return (
    <div className="recently-viewed">
      <h2>Recently Viewed Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;