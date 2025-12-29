import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Slider from './Slider';
import BackButton from './BackButton';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Sample slides data - in a real app, this would come from an API
  const slides = [
    {
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
      title: 'Bộ Sưu Tập Mùa Hè',
      subtitle: 'Khám phá xu hướng thời trang mới nhất',
      buttonText: 'Xem Ngay'
    },
    {
      image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
      title: 'Váy Dạ Hội Cao Cấp',
      subtitle: 'Thuê hoặc mua váy cho dịp đặc biệt',
      buttonText: 'Khám Phá'
    },
    {
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
      title: 'Ưu Đãi Đặc Biệt',
      subtitle: 'Giảm giá đến 50%',
      buttonText: 'Mua Ngay'
    }
  ];

  return (
    <div className="homepage">
      <BackButton text="Trang chủ" className="minimal" />
      <Slider slides={slides} />
      
      <section className="hero">
        <div className="hero-content">
          <h1>Chào mừng đến với TMie</h1>
          <p>Nền tảng thương mại điện tử và cho thuê sản phẩm thời trang hàng đầu</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/products')}>Khám phá ngay</button>
            <button className="btn btn-outline">Tìm hiểu thêm</button>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Tại sao chọn TMie?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3>Mua sắm đa dạng</h3>
              <p>Khám phá hàng ngàn sản phẩm thời trang từ các thương hiệu uy tín</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Cho thuê linh hoạt</h3>
              <p>Thuê sản phẩm thời trang cao cấp với chi phí hợp lý</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Chất lượng đảm bảo</h3>
              <p>Tất cả sản phẩm đều được kiểm tra chất lượng trước khi giao đến khách hàng</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Giao hàng nhanh chóng</h3>
              <p>Giao hàng trong ngày cho các đơn hàng nội thành</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="products-preview">
        <div className="container">
          <h2>Sản phẩm nổi bật</h2>
          <div className="products-grid">
            <div className="product-card" onClick={() => navigate('/products')}>
              <div className="product-image"></div>
              <h3>Váy dạ hội</h3>
              <p>Mua: 2.500.000đ | Thuê: 500.000đ/ngày</p>
            </div>
            <div className="product-card" onClick={() => navigate('/products')}>
              <div className="product-image"></div>
              <h3>Vest công sở</h3>
              <p>Mua: 3.200.000đ | Thuê: 400.000đ/ngày</p>
            </div>
            <div className="product-card" onClick={() => navigate('/products')}>
              <div className="product-image"></div>
              <h3>Đầm cocktail</h3>
              <p>Mua: 1.800.000đ | Thuê: 350.000đ/ngày</p>
            </div>
            <div className="product-card" onClick={() => navigate('/products')}>
              <div className="product-image"></div>
              <h3>Áo sơ mi cao cấp</h3>
              <p>Mua: 950.000đ | Thuê: 150.000đ/ngày</p>
            </div>
          </div>
          <div className="view-all-container">
            <button className="btn btn-outline" onClick={() => navigate('/products')}>Xem tất cả sản phẩm</button>
          </div>
        </div>
      </section>
      
      <section className="cta">
        <div className="container">
          <h2>Bắt đầu hành trình thời trang của bạn ngay hôm nay</h2>
          <p>Đăng ký tài khoản để nhận ưu đãi độc quyền và trải nghiệm dịch vụ tốt nhất</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>Xem sản phẩm</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;