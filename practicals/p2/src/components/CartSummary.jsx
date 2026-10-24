import React, { useState } from 'react';

const CartSummary = ({ items, discountPercent, onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const tax = ((subtotal - discountAmount) * 0.18); // 18% GST
  const grandTotal = subtotal - discountAmount + (subtotal > 0 ? tax : 0);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'MSD20') {
      onApplyCoupon(20);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Coupon. Use "MSD20" for 20% off.');
    }
  };

  return (
    <div className="cart-summary-card">
      <h3>Order Summary</h3>
      <div className="summary-line">
        <span>Total Items:</span>
        <strong>{totalItems}</strong>
      </div>
      <div className="summary-line">
        <span>Subtotal:</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>
      {discountPercent > 0 && (
        <div className="summary-line discount-line">
          <span>Discount ({discountPercent}%):</span>
          <span>- ₹{discountAmount.toLocaleString()}</span>
        </div>
      )}
      <div className="summary-line">
        <span>GST (18%):</span>
        <span>₹{Math.round(tax).toLocaleString()}</span>
      </div>
      <hr className="summary-divider" />
      <div className="summary-line grand-total">
        <span>Grand Total:</span>
        <span>₹{Math.round(grandTotal).toLocaleString()}</span>
      </div>

      <form onSubmit={handleCouponSubmit} className="coupon-form">
        <input
          type="text"
          placeholder="Enter coupon (e.g. MSD20)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="coupon-input"
        />
        <button type="submit" className="coupon-btn">Apply</button>
      </form>
      {errorMsg && <p className="error-text">{errorMsg}</p>}
      {discountPercent > 0 && <p className="success-text">20% coupon applied successfully.</p>}
    </div>
  );
};

export default CartSummary;