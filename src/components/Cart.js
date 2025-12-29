import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalRentalPrice, setTotalRentalPrice] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      calculateTotals(parsedCart);
    }
  }, []);

  const calculateTotals = (items) => {
    const purchaseTotal = items
      .filter(item => item.type === 'purchase')
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const rentalTotal = items
      .filter(item => item.type === 'rental')
      .reduce((sum, item) => sum + (item.rentalPrice * item.quantity), 0);
    
    setTotalPrice(purchaseTotal);
    setTotalRentalPrice(rentalTotal);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotalPrice(0);
    setTotalRentalPrice(0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="cart-page">
      <div className="container">
        <BackButton text="Quay lại sản phẩm" />
        
        <h1 className="cart-title">Giỏ hàng của bạn</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/products" className="btn btn-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <h3>Sản phẩm ({cartItems.length})</h3>
                <button className="clear-cart-btn" onClick={clearCart}>
                  Xóa tất cả
                </button>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-category">{item.category}</p>
                    <div className="item-options">
                      <span className="item-size">Size: {item.selectedSize}</span>
                      <span className="item-color">Màu: {item.selectedColor}</span>
                    </div>
                    <div className="item-type">
                      {item.type === 'purchase' ? (
                        <span className="type-badge purchase">Mua</span>
                      ) : (
                        <span className="type-badge rental">Thuê</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-price">
                    {item.type === 'purchase' ? (
                      <span className="price">{formatPrice(item.price)}</span>
                    ) : (
                      <span className="rental-price">{formatPrice(item.rentalPrice)}/ngày</span>
                    )}
                  </div>
                  
                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn decrease"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn increase"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-total">
                    {item.type === 'purchase' ? (
                      <span className="total-price">{formatPrice(item.price * item.quantity)}</span>
                    ) : (
                      <span className="total-rental-price">{formatPrice(item.rentalPrice * item.quantity)}/ngày</span>
                    )}
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Tóm tắt đơn hàng</h3>
              
              <div className="summary-item">
                <span>Tổng tiền mua:</span>
                <span className="summary-value">{formatPrice(totalPrice)}</span>
              </div>
              
              <div className="summary-item">
                <span>Tổng tiền thuê/ngày:</span>
                <span className="summary-value">{formatPrice(totalRentalPrice)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-item summary-total">
                <span>Tổng cộng:</span>
                <span className="summary-value">
                  {formatPrice(totalPrice + totalRentalPrice)}
                </span>
              </div>
              
              <div className="cart-actions">
                <Link to="/products" className="btn btn-outline">
                  Tiếp tục mua sắm
                </Link>
                <button className="btn btn-primary">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;