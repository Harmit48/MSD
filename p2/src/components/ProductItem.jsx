import React from 'react';

const ProductItem = ({ product, onQuantityChange }) => {
  return (
    <div className="product-row">
      <div className="product-info">
        <span className="product-icon">{product.icon}</span>
        <div>
          <h4 className="product-name">{product.name}</h4>
          <span className="product-category">{product.category}</span>
        </div>
      </div>
      <div className="product-price">₹{product.price.toLocaleString()}</div>
      <div className="quantity-controls">
        <button
          className="qty-btn"
          onClick={() => onQuantityChange(product.id, -1)}
          disabled={product.quantity <= 0}
        >
          -
        </button>
        <span className="qty-value">{product.quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onQuantityChange(product.id, 1)}
        >
          +
        </button>
      </div>
      <div className="product-subtotal">
        ₹{(product.price * product.quantity).toLocaleString()}
      </div>
    </div>
  );
};

export default ProductItem;