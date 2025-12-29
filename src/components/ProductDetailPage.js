import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';
import BackButton from './BackButton';
import PurchasePopup from './PurchasePopup';
import RentalPopup from './RentalPopup';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // Sample product data - in a real app, this would come from an API
  const [products] = useState([
    { id: 1, name: 'Váy dạ hội cao cấp', category: 'Váy dạ hội', price: 2500000, rentalPrice: 500000, image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg', isFeatured: true, isBestSeller: false, description: 'Váy dạ hội thiết kế cao cấp, phù hợp cho các sự kiện quan trọng. Thiết kế với chất liệu cao cấp, form dáng sang trọng giúp tôn lên vóc dáng của người mặc.', brand: 'TMie Collection', material: 'Silk', sizes: ['S', 'M', 'L'], colors: ['Đen', 'Trắng', 'Đỏ'], stock: 15, views: 1256, rating: 4.8, reviews: 23 },
    { id: 2, name: 'Vest công sở sang trọng', category: 'Vest', price: 3200000, rentalPrice: 400000, image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg', isFeatured: true, isBestSeller: false, description: 'Vest công sở cao cấp, thiết kế hiện đại và thanh lịch. Chất liệu cao cấp, đường may tỉ mỉ, phù hợp cho môi trường công sở chuyên nghiệp.', brand: 'TMie Business', material: 'Wool', sizes: ['M', 'L', 'XL'], colors: ['Xanh navy', 'Đen', 'Xám'], stock: 8, views: 892, rating: 4.6, reviews: 18 },
    { id: 3, name: 'Đầm cocktail thời trang', category: 'Đầm', price: 1800000, rentalPrice: 350000, image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg', isFeatured: true, isBestSeller: false, description: 'Đầm cocktail thiết kế độc đáo, phù hợp cho các buổi tiệc. Kiểu dáng hiện đại, chất liệu cao cấp mang lại sự thoải mái và tự tin cho người mặc.', brand: 'TMie Evening', material: 'Chiffon', sizes: ['S', 'M', 'L'], colors: ['Hồng', 'Tím', 'Xanh'], stock: 12, views: 1567, rating: 4.7, reviews: 31 },
    { id: 4, name: 'Áo sơ mi cao cấp', category: 'Áo sơ mi', price: 950000, rentalPrice: 150000, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', isFeatured: false, isBestSeller: true, description: 'Áo sơ mi cao cấp, chất liệu cotton thoáng mát. Thiết kế đơn giản nhưng sang trọng, phù hợp cho cả công sở và các buổi gặp mặt quan trọng.', brand: 'TMie Office', material: 'Cotton', sizes: ['S', 'M', 'L', 'XL'], colors: ['Trắng', 'Xanh nhạt', 'Hồng'], stock: 25, views: 2103, rating: 4.5, reviews: 42 },
    { id: 5, name: 'Quần tây công sở', category: 'Quần', price: 1200000, rentalPrice: 200000, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg', isFeatured: false, isBestSeller: true, description: 'Quần tây công sở, form dáng chuẩn, chất liệu cao cấp. Thiết kế ôm vừa vặn, tạo nên vẻ ngoài chuyên nghiệp và lịch lãm.', brand: 'TMie Business', material: 'Polyester', sizes: ['28', '29', '30', '31', '32'], colors: ['Đen', 'Xám', 'Xanh navy'], stock: 18, views: 1789, rating: 4.4, reviews: 27 },
    { id: 6, name: 'Váy hoa nữ tính', category: 'Váy', price: 1500000, rentalPrice: 300000, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', isFeatured: false, isBestSeller: true, description: 'Váy hoa thiết kế nữ tính, phù hợp cho các buổi dạo phố. Họa tiết hoa tươi tắn, chất liệu mềm mại mang lại cảm giác thoải mái khi mặc.', brand: 'TMie Casual', material: 'Rayon', sizes: ['S', 'M', 'L'], colors: ['Hoa hồng', 'Hoa xanh', 'Hoa vàng'], stock: 20, views: 2341, rating: 4.9, reviews: 56 },
    { id: 7, name: 'Áo blazer thời trang', category: 'Áo khoác', price: 2200000, rentalPrice: 380000, image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg', isFeatured: false, isBestSeller: false, description: 'Áo blazer thiết kế hiện đại, phù hợp cho công sở và dạo phố. Kiểu dáng thanh lịch, có thể kết hợp với nhiều trang phục khác nhau.', brand: 'TMie Style', material: 'Tweed', sizes: ['S', 'M', 'L', 'XL'], colors: ['Be', 'Đen', 'Hồng'], stock: 10, views: 987, rating: 4.3, reviews: 15 },
    { id: 8, name: 'Chân váy bút chì', category: 'Chân váy', price: 1100000, rentalPrice: 180000, image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg', isFeatured: false, isBestSeller: false, description: 'Chân váy bút chì form dáng chuẩn, phù hợp cho công sở. Thiết kế ôm sát, tôn lên vóc dáng và mang lại vẻ ngoài chuyên nghiệp.', brand: 'TMie Office', material: 'Polyester', sizes: ['S', 'M', 'L'], colors: ['Đen', 'Xám', 'Navy'], stock: 15, views: 1456, rating: 4.6, reviews: 22 },
    { id: 9, name: 'Áo thun premium', category: 'Áo thun', price: 650000, rentalPrice: 100000, image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg', isFeatured: false, isBestSeller: false, description: 'Áo thun cao cấp, chất liệu cotton 100%. Thiết kế đơn giản nhưng không kém phần thời trang, phù hợp cho mọi hoạt động hàng ngày.', brand: 'TMie Basic', material: 'Cotton', sizes: ['S', 'M', 'L', 'XL'], colors: ['Trắng', 'Đen', 'Xám', 'Xanh'], stock: 30, views: 3214, rating: 4.7, reviews: 38 },
    { id: 10, name: 'Quần jeans thời trang', category: 'Quần', price: 1400000, rentalPrice: 220000, image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg', isFeatured: false, isBestSeller: false, description: 'Quần jeans form dáng đẹp, chất liệu denim cao cấp. Thiết kế hiện đại, phù hợp với nhiều phong cách thời trang khác nhau.', brand: 'TMie Denim', material: 'Denim', sizes: ['28', '29', '30', '31', '32'], colors: ['Xanh đậm', 'Xanh nhạt', 'Đen'], stock: 22, views: 2876, rating: 4.5, reviews: 29 },
    { id: 11, name: 'Váy maxi mùa hè', category: 'Váy', price: 1700000, rentalPrice: 280000, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', isFeatured: false, isBestSeller: false, description: 'Váy maxi thiết kế thoải mái, phù hợp cho mùa hè. Chất liệu mát mẻ, form dáng rộng rãi mang lại cảm giác thoải mái suốt ngày dài.', brand: 'TMie Summer', material: 'Rayon', sizes: ['S', 'M', 'L'], colors: ['Hoa văn', 'Trơn', 'Sọc'], stock: 14, views: 1678, rating: 4.8, reviews: 24 },
    { id: 12, name: 'Áo khoác denim', category: 'Áo khoác', price: 1900000, rentalPrice: 320000, image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg', isFeatured: false, isBestSeller: false, description: 'Áo khoác denim phong cách trẻ trung, năng động. Thiết kế bền bỉ, phù hợp cho các hoạt động ngoài trời và dạo phố.', brand: 'TMie Casual', material: 'Denim', sizes: ['S', 'M', 'L', 'XL'], colors: ['Xanh', 'Đen', 'Trắng'], stock: 16, views: 1234, rating: 4.4, reviews: 19 }
  ]);
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [showRentalPopup, setShowRentalPopup] = useState(false);
  
  // Sample customer reviews
  const [customerReviews] = useState([
    { id: 1, name: 'Nguyễn Thị A', rating: 5, date: '2024-01-15', comment: 'Sản phẩm rất đẹp, chất liệu tốt, đúng như mô tả. Rất hài lòng với chất lượng!', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Trần Văn B', rating: 4, date: '2024-01-10', comment: 'Váy rất đẹp và form dáng tốt. Chỉ có điểm nhỏ là size hơi nhỏ so với mong đợi.', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Lê Thị C', rating: 5, date: '2024-01-05', comment: 'Mua lần thứ hai rồi, chất lượng vẫn rất tốt. Sẽ tiếp tục ủng hộ shop.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Phạm Văn D', rating: 4, date: '2023-12-28', comment: 'Sản phẩm tốt, giao hàng nhanh. Rất thích kiểu dáng này.', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Hoàng Thị E', rating: 5, date: '2023-12-20', comment: 'Chất liệu mềm mại, mặc rất thoải mái. Đáng tiền!', avatar: 'https://i.pravatar.cc/150?img=5' }
  ]);
  
  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === parseInt(productId));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
      setViewCount(foundProduct.views);
      // Set default first size and color
      if (foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      if (foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
    }
  }, [productId, products]);
  
  const handleBackToProducts = () => {
    navigate('/products');
  };
  
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleBuyNow = () => {
    setShowPurchasePopup(true);
  };
  
  const handleRentNow = () => {
    setShowRentalPopup(true);
  };
  
  const handleAddToCart = (type) => {
    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}-${type}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      price: product.price,
      rentalPrice: product.rentalPrice,
      selectedSize,
      selectedColor,
      quantity,
      type
    };
    
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    let cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Add new item to cart
    cartItems.push(cartItem);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message
    const message = type === 'purchase'
      ? `Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`
      : `Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng thuê!`;
    alert(message);
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would save to backend
  };
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  const handlePurchaseConfirm = (orderData) => {
    // Add to cart
    handleAddToCart('purchase');
    setShowPurchasePopup(false);
    
    // In a real app, this would process the order
    console.log('Purchase order:', orderData);
  };
  
  const handleRentalConfirm = (orderData) => {
    // Add to cart
    handleAddToCart('rental');
    setShowRentalPopup(false);
    
    // In a real app, this would process the rental
    console.log('Rental order:', orderData);
  };
  
  // Get related products from the same category
  const getRelatedProducts = () => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };
  
  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <BackButton
            text="Quay lại danh sách sản phẩm"
            onClick={handleBackToProducts}
          />
          <div className="product-not-found">
            <h2>Không tìm thấy sản phẩm</h2>
          </div>
        </div>
      </div>
    );
  }
  
  // Sample additional images for the product
  const additionalImages = [
    product.image,
    'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
    'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
    'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg'
  ];
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <BackButton
          text="Quay lại sản phẩm"
          onClick={handleBackToProducts}
        />
        
        <div className="product-detail">
          <div className="product-images">
            <div className="main-image">
              <img src={mainImage} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {additionalImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-actions-header">
                <button
                  className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                  onClick={handleToggleFavorite}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>
                <div className="view-count">
                  <span className="view-icon">👁️</span>
                  <span>{viewCount.toLocaleString('vi-VN')} lượt xem</span>
                </div>
              </div>
              <div className="product-badges">
                {product.isFeatured && <span className="badge featured">Nổi bật</span>}
                {product.isBestSeller && <span className="badge best-seller">Bán chạy</span>}
              </div>
            </div>
            
            <div className="product-meta">
              <p className="product-category">Danh mục: {product.category}</p>
              <p className="product-brand">Thương hiệu: {product.brand}</p>
              <p className="product-stock">Tình trạng: {product.stock > 0 ? `Còn hàng (${product.stock} sản phẩm)` : 'Hết hàng'}</p>
              <div className="product-rating">
                <div className="stars">{renderStars(product.rating)}</div>
                <span className="rating-value">{product.rating}</span>
                <span className="review-count">({product.reviews} đánh giá)</span>
              </div>
            </div>
            
            <div className="product-price">
              <span className="purchase-price">{formatPrice(product.price)}</span>
              <span className="rental-price">Thuê: {formatPrice(product.rentalPrice)}/ngày</span>
            </div>
            
            <div className="product-options">
              <div className="size-selector">
                <h4>Kích thước:</h4>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="color-selector">
                <h4>Màu sắc:</h4>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="quantity-selector">
                <h4>Số lượng:</h4>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn decrease"
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn increase"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="product-actions">
              <button className="btn btn-primary" onClick={handleBuyNow}>
                Mua ngay
              </button>
              <button className="btn btn-outline" onClick={handleRentNow}>
                Thuê sản phẩm
              </button>
            </div>
            
            <div className="product-details">
              <div className="detail-tabs">
                <button 
                  className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Mô tả sản phẩm
                </button>
                <button 
                  className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Thông số kỹ thuật
                </button>
                <button 
                  className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Đánh giá
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="description-content">
                    <p>{product.description}</p>
                    <p>Sản phẩm được thiết kế với sự chăm chút tỉ mỉ đến từng chi tiết, mang lại sự thoải mái và tự tin cho người mặc. Chất liệu cao cấp đảm bảo độ bền và giữ form dáng sau nhiều lần sử dụng.</p>
                  </div>
                )}
                
                {activeTab === 'specifications' && (
                  <div className="specifications-content">
                    <div className="spec-item">
                      <span className="spec-label">Chất liệu:</span>
                      <span className="spec-value">{product.material}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Thương hiệu:</span>
                      <span className="spec-value">{product.brand}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Xuất xứ:</span>
                      <span className="spec-value">Việt Nam</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Hướng dẫn giặt:</span>
                      <span className="spec-value">Giặt tay hoặc giặt máy ở chế độ nhẹ</span>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="reviews-content">
                    <div className="reviews-summary">
                      <div className="average-rating">
                        <span className="rating-number">{product.rating}</span>
                        <div className="stars">{renderStars(product.rating)}</div>
                        <span className="total-reviews">Dựa trên {product.reviews} đánh giá</span>
                      </div>
                      <button className="btn btn-outline">Viết đánh giá</button>
                    </div>
                    
                    <div className="customer-reviews">
                      <h3>Đánh giá của khách hàng</h3>
                      {customerReviews.map(review => (
                        <div key={review.id} className="review-item">
                          <div className="review-header">
                            <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
                            <div className="reviewer-info">
                              <h4>{review.name}</h4>
                              <div className="review-stars">{renderStars(review.rating)}</div>
                            </div>
                            <span className="review-date">{review.date}</span>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="related-products-section">
          <h2>Sản phẩm liên quan</h2>
          <div className="related-products-grid">
            {getRelatedProducts().map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="related-product-card"
                onClick={() => handleProductClick(relatedProduct.id)}
              >
                <div className="related-product-image">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <div className="related-product-price">
                    <span className="price">{formatPrice(relatedProduct.price)}</span>
                    <span className="rental-price">Thuê: {formatPrice(relatedProduct.rentalPrice)}/ngày</span>
                  </div>
                  <div className="related-product-rating">
                    <div className="stars">{renderStars(relatedProduct.rating)}</div>
                    <span>({relatedProduct.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Popups */}
      {showPurchasePopup && (
        <PurchasePopup
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          quantity={quantity}
          onClose={() => setShowPurchasePopup(false)}
          onConfirm={handlePurchaseConfirm}
        />
      )}
      
      {showRentalPopup && (
        <RentalPopup
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          quantity={quantity}
          onClose={() => setShowRentalPopup(false)}
          onConfirm={handleRentalConfirm}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;