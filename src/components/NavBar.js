import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate('/products', { state: { searchQuery: searchQuery.trim() } });
      setSearchQuery('');
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  useEffect(() => {
    // Load cart from localStorage and update count
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };
    
    updateCartCount();
    
    // Listen for storage changes to update cart count
    const handleStorageChange = () => {
      updateCartCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for cart updates within the same tab
    window.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">TMie</Link>
        </div>
        
        {/* Search Bar - Desktop */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>
                Sản phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className={`nav-link ${isActive('/categories') ? 'active' : ''}`}>
                Danh mục
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/livestream" className={`nav-link ${isActive('/livestream') ? 'active' : ''}`}>
                <span className="livestream-icon">
                  📹
                  <span className="live-indicator-nav"></span>
                </span>
                Livestream
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}>
                <span className="cart-icon">
                  🛒
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </span>
                <span className="cart-text">Giỏ hàng</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`}>
                Đơn hàng
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                Hồ sơ
              </Link>
            </li>
          </ul>
          
          {/* Search Bar - Mobile */}
          <form className="navbar-search-mobile" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>
          
          <div className="navbar-auth">
            <Link to="/login" className="btn btn-outline">
              Đăng nhập
            </Link>
            <Link to="/create-account" className="btn btn-primary">
              Đăng ký
            </Link>
          </div>
        </div>
        
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;