import React, { useState } from 'react';
import ProductItem from './components/ProductItem';
import CartSummary from './components/CartSummary';
import AppBar from './components/AppBar';

const INITIAL_PRODUCTS = [
  { id: 101, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 3499, quantity: 1, icon: "⌨️" },
  { id: 102, name: "Wireless Ergonomic Mouse", category: "Electronics", price: 1899, quantity: 2, icon: "🖱️" },
  { id: 103, name: "Noise Cancelling Headphones", category: "Audio", price: 7999, quantity: 0, icon: "🎧" },
  { id: 104, name: "4K IPS Monitor 27-inch", category: "Electronics", price: 21999, quantity: 1, icon: "🖥️" },
  { id: 105, name: "Developer Hoodie (Cotton)", category: "Apparel", price: 1499, quantity: 1, icon: "👕" }
];

function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [discount, setDiscount] = useState(0);

  // Event handler for quantity modification (Child -> Parent communication)
  const handleQuantityChange = (productId, delta) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const categories = ['All', 'Electronics', 'Audio', 'Apparel'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <AppBar practical="02" />
      <div className="page">
      <header className="page-head">
        <span className="eyebrow">Practical 02 · State &amp; Props</span>
        <h1>Shopping Cart &amp; State Manager</h1>
        <p>Demonstrating props, the useState hook and synthetic event handlers.</p>
      </header>

      <div className="controls-bar">
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="search-box"
          placeholder="Search items by name…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="cart-layout">
        <div className="product-list-container">
          <div className="list-header">
            <span>Product Details</span>
            <span>Unit Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <aside className="summary-sidebar">
          <CartSummary
            items={products}
            discountPercent={discount}
            onApplyCoupon={(disc) => setDiscount(disc)}
          />
        </aside>
      </div>
      <p className="footer">Harmit Suthar (23084231044) · Practical 02</p>
      </div>
    </>
  );
}

export default App;