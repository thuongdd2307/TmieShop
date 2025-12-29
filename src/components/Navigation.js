import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="navigation-header">
        <h1>TMie - E-commerce & Rental Platform</h1>
        <p>Chọn trang bạn muốn truy cập</p>
      </div>
      
      <div className="navigation-grid">
        {/* Authentication Pages */}
        <div className="nav-section">
          <h2>Xác thực người dùng</h2>
          <div className="nav-links">
            <Link to="/login" className="nav-link">
              <div className="nav-icon">🔐</div>
              <div className="nav-info">
                <h3>Đăng nhập</h3>
                <p>Trang đăng nhập cho người dùng đã có tài khoản</p>
              </div>
            </Link>
            
            <Link to="/create-account" className="nav-link">
              <div className="nav-icon">👤</div>
              <div className="nav-info">
                <h3>Đăng ký tài khoản</h3>
                <p>Tạo tài khoản mới để sử dụng dịch vụ</p>
              </div>
            </Link>
            
            <Link to="/otp-verification" className="nav-link">
              <div className="nav-icon">🔑</div>
              <div className="nav-info">
                <h3>Xác thực OTP</h3>
                <p>Xác thực mã OTP để hoàn tất đăng ký</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Customer Pages */}
        <div className="nav-section">
          <h2>Trang khách hàng</h2>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <div className="nav-icon">🏠</div>
              <div className="nav-info">
                <h3>Trang chủ</h3>
                <p>Trang chính với các sản phẩm nổi bật</p>
              </div>
            </Link>
            
            <Link to="/products" className="nav-link">
              <div className="nav-icon">🛍️</div>
              <div className="nav-info">
                <h3>Sản phẩm</h3>
                <p>Xem danh sách sản phẩm mua và thuê</p>
              </div>
            </Link>
            
            <Link to="/cart" className="nav-link">
              <div className="nav-icon">🛒</div>
              <div className="nav-info">
                <h3>Giỏ hàng</h3>
                <p>Quản lý giỏ hàng mua và thuê</p>
              </div>
            </Link>
            
            <Link to="/orders" className="nav-link">
              <div className="nav-icon">📦</div>
              <div className="nav-info">
                <h3>Đơn hàng</h3>
                <p>Xem lịch sử đơn hàng mua và thuê</p>
              </div>
            </Link>
            
            <Link to="/profile" className="nav-link">
              <div className="nav-icon">👤</div>
              <div className="nav-info">
                <h3>Hồ sơ cá nhân</h3>
                <p>Quản lý thông tin cá nhân và cài đặt</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Admin Pages */}
        <div className="nav-section">
          <h2>Trang quản trị</h2>
          <div className="nav-links">
            <Link to="/admin/dashboard" className="nav-link">
              <div className="nav-icon">📊</div>
              <div className="nav-info">
                <h3>Bảng điều khiển</h3>
                <p>Thống kê và tổng quan hệ thống</p>
              </div>
            </Link>
            
            <Link to="/admin/products" className="nav-link">
              <div className="nav-icon">📦</div>
              <div className="nav-info">
                <h3>Quản lý sản phẩm</h3>
                <p>Thêm, sửa, xóa sản phẩm và variants</p>
              </div>
            </Link>
            
            <Link to="/admin/orders" className="nav-link">
              <div className="nav-icon">📋</div>
              <div className="nav-info">
                <h3>Quản lý đơn hàng</h3>
                <p>Xử lý đơn hàng mua và thuê</p>
              </div>
            </Link>
            
            <Link to="/admin/users" className="nav-link">
              <div className="nav-icon">👥</div>
              <div className="nav-info">
                <h3>Quản lý người dùng</h3>
                <p>Quản lý tài khoản và phân quyền</p>
              </div>
            </Link>
            
            <Link to="/admin/inventory" className="nav-link">
              <div className="nav-icon">📊</div>
              <div className="nav-info">
                <h3>Quản lý kho</h3>
                <p>Theo dõi tồn kho và trạng thái thuê</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Content & Social Pages */}
        <div className="nav-section">
          <h2>Nội dung & Social</h2>
          <div className="nav-links">
            <Link to="/blog" className="nav-link">
              <div className="nav-icon">📝</div>
              <div className="nav-info">
                <h3>Blog</h3>
                <p>Bài viết và nội dung social commerce</p>
              </div>
            </Link>
            
            <Link to="/categories" className="nav-link">
              <div className="nav-icon">🏷️</div>
              <div className="nav-info">
                <h3>Danh mục</h3>
                <p>Xem sản phẩm theo danh mục</p>
              </div>
            </Link>
            
            <Link to="/search" className="nav-link">
              <div className="nav-icon">🔍</div>
              <div className="nav-info">
                <h3>Tìm kiếm</h3>
                <p>Tìm kiếm sản phẩm và nội dung</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;