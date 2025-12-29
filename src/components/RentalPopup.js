import React, { useState } from 'react';
import './RentalPopup.css';

const RentalPopup = ({ product, selectedSize, selectedColor, quantity, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    zipCode: '',
    rentalDays: 1,
    startDate: '',
    endDate: '',
    idCard: '',
    deposit: '',
    note: '',
    paymentMethod: 'cod',
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRentalDaysChange = (e) => {
    const days = parseInt(e.target.value) || 1;
    setFormData(prev => ({
      ...prev,
      rentalDays: days
    }));
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    const rentalDays = parseInt(formData.rentalDays) || 1;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + rentalDays);
    
    setFormData(prev => ({
      ...prev,
      startDate,
      endDate: endDate.toISOString().split('T')[0]
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
      type: 'rental'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const calculateRentalPrice = () => {
    return product.rentalPrice * quantity * formData.rentalDays;
  };

  const calculateDeposit = () => {
    return product.price * quantity * 0.3; // 30% of product price as deposit
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="popup-overlay">
      <div className="popup-container rental-popup">
        <div className="popup-header">
          <h2>Thông tin thuê hàng</h2>
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
                <span className="price">{formatPrice(product.rentalPrice)}/ngày</span>
                <span className="total">Tổng thuê: {formatPrice(calculateRentalPrice())}</span>
              </div>
            </div>
          </div>
          
          <form className="rental-form" onSubmit={handleSubmit}>
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
              <div className="form-group">
                <label htmlFor="idCard">Số CMND/CCCD *</label>
                <input
                  type="text"
                  id="idCard"
                  name="idCard"
                  value={formData.idCard}
                  onChange={handleInputChange}
                  placeholder="Nhập số CMND/CCCD của bạn"
                  required
                />
              </div>
            </div>
            
            <div className="form-section">
              <h4>Thông tin thuê</h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rentalDays">Số ngày thuê *</label>
                  <input
                    type="number"
                    id="rentalDays"
                    name="rentalDays"
                    value={formData.rentalDays}
                    onChange={handleRentalDaysChange}
                    min="1"
                    max="30"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Ngày bắt đầu *</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleStartDateChange}
                    min={today}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Ngày kết thúc</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  readOnly
                  className="readonly-input"
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
            </div>
            
            <div className="form-section">
              <h4>Thông tin thanh toán</h4>
              <div className="payment-summary">
                <div className="summary-item">
                  <span>Tiền thuê ({formData.rentalDays} ngày):</span>
                  <span className="summary-value">{formatPrice(calculateRentalPrice())}</span>
                </div>
                <div className="summary-item">
                  <span>Tiền đặt cọc (30%):</span>
                  <span className="summary-value">{formatPrice(calculateDeposit())}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-item total">
                  <span>Tổng thanh toán:</span>
                  <span className="summary-value">{formatPrice(calculateRentalPrice() + calculateDeposit())}</span>
                </div>
              </div>
              
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
              </div>
            </div>
            
            <div className="form-section">
              <h4>Điều khoản thuê</h4>
              <div className="terms-container">
                <div className="terms-content">
                  <p>Bằng việc xác nhận thuê hàng, bạn đồng ý với các điều khoản sau:</p>
                  <ul>
                    <li>Sản phẩm phải được trả đúng hạn và trong tình trạng nguyên vẹn</li>
                    <li>Chịu trách nhiệm cho mọi hư hỏng hoặc mất mát trong quá trình sử dụng</li>
                    <li>Tiền đặt cọc sẽ được hoàn trả sau khi trả sản phẩm</li>
                    <li>Mất mát hoặc hư hỏng nặng sẽ bị trừ tiền đặt cọc</li>
                    <li>Vi phạm các điều khoản có thể bị xử lý theo pháp luật</li>
                  </ul>
                </div>
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span>Tôi đồng ý với các điều khoản thuê hàng</span>
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
              <button type="submit" className="btn btn-primary" disabled={!formData.agreeTerms}>
                Xác nhận thuê hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentalPopup;