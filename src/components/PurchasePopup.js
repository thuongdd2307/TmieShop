import React, { useState } from 'react';
import './PurchasePopup.css';

const PurchasePopup = ({ product, selectedSize, selectedColor, quantity, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    note: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      ...formData,
      product,
      selectedSize,
      selectedColor,
      quantity,
      type: 'purchase'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container purchase-popup">
        <div className="popup-header">
          <h2>Thông tin mua hàng</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="popup-content">
          <div className="product-summary">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-options">
                <span>Size: {selectedSize}</span>
                <span>Màu: {selectedColor}</span>
                <span>Số lượng: {quantity}</span>
              </div>
              <div className="product-price">
                <span className="price">{formatPrice(product.price)}</span>
                <span className="total">Tổng: {formatPrice(product.price * quantity)}</span>
              </div>
            </div>
          </div>
          
          <form className="purchase-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h4>Thông tin cá nhân</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4>Địa chỉ giao hàng</h4>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ cụ thể *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Số nhà, tên đường..."
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Tỉnh/Thành phố *</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcmc">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="haiphong">Hải Phòng</option>
                    <option value="cantho">Cần Thơ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="district">Quận/Huyện *</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="district1">Quận 1</option>
                    <option value="district2">Quận 2</option>
                    <option value="district3">Quận 3</option>
                    <option value="district7">Quận 7</option>
                    <option value="binhthanh">Bình Thạnh</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Mã bưu điện</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Không bắt buộc"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4>Phương thức thanh toán</h4>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <span className="payment-label">
                    <span className="payment-title">Thanh toán khi nhận hàng (COD)</span>
                    <span className="payment-desc">Thanh toán bằng tiền mặt khi nhận hàng</span>
                  </span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleInputChange}
                  />
                  <span className="payment-label">
                    <span className="payment-title">Chuyển khoản ngân hàng</span>
                    <span className="payment-desc">Chuyển khoản qua ngân hàng</span>
                  </span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <span className="payment-label">
                    <span className="payment-title">Thẻ tín dụng/Ghi nợ</span>
                    <span className="payment-desc">Thanh toán qua thẻ Visa/Mastercard</span>
                  </span>
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Ghi chú</h4>
              <div className="form-group">
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="Nhập ghi chú cho đơn hàng của bạn (nếu có)"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Xác nhận mua hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchasePopup;