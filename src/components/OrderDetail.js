import React from 'react';
import BackButton from './BackButton';
import './OrderDetail.css';

const OrderDetail = ({ order, onBack, currentLanguage = 'vi', translations, onCancelOrder }) => {
  const getStatusText = (status, orderType) => {
    if (orderType === 'purchase') {
      switch (status) {
        case 'pending': return 'Đã lên đơn';
        case 'shipping': return 'Đang vận chuyển';
        case 'delivered': return 'Đã nhận hàng';
        case 'cancelled': return 'Đã hủy';
        default: return status;
      }
    } else {
      switch (status) {
        case 'pending': return 'Đã lên đơn';
        case 'active': return 'Đang thuê';
        case 'overdue': return 'Quá hạn';
        case 'returned': return 'Đã trả';
        case 'cancelled': return 'Đã hủy';
        default: return status;
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'shipping': return 'status-shipping';
      case 'delivered': return 'status-delivered';
      case 'active': return 'status-active';
      case 'overdue': return 'status-overdue';
      case 'returned': return 'status-returned';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const calculateRentalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntilReturn = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCancelOrder = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      onCancelOrder(order.id);
      onBack();
    }
  };

  const renderRentalInfo = () => {
    if (order.type !== 'rental' || !order.rentalPeriod) return null;

    const { startDate, endDate } = order.rentalPeriod;
    const rentalDays = calculateRentalDays(startDate, endDate);
    const daysUntilReturn = getDaysUntilReturn(endDate);

    return (
      <div className="rental-info">
        <h3>Thông tin thuê</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Ngày bắt đầu:</span>
            <span className="info-value">{startDate}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Ngày kết thúc:</span>
            <span className="info-value">{endDate}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Số ngày thuê:</span>
            <span className="info-value">{rentalDays} ngày</span>
          </div>
          <div className="info-item">
            <span className="info-label">Tiền cọc:</span>
            <span className="info-value deposit-amount">
              {order.deposit.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>
        
        {order.status === 'active' && (
          <div className="return-reminder">
            {daysUntilReturn > 0 ? (
              <p className="days-remaining">
                Còn {daysUntilReturn} ngày đến hạn trả
              </p>
            ) : (
              <p className="overdue-warning">
                Đã quá hạn {Math.abs(daysUntilReturn)} ngày
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderShippingInfo = () => {
    if (!order.shippingAddress) return null;

    return (
      <div className="shipping-info">
        <h3>Thông tin vận chuyển</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Địa chỉ nhận hàng:</span>
            <span className="info-value">{order.shippingAddress}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phương thức thanh toán:</span>
            <span className="info-value">{order.paymentMethod}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderOrderTimeline = () => {
    const timeline = [];
    
    if (order.type === 'purchase') {
      timeline.push(
        { status: 'pending', label: 'Đã lên đơn', completed: true },
        { status: 'shipping', label: 'Đang vận chuyển', completed: order.status === 'shipping' || order.status === 'delivered' },
        { status: 'delivered', label: 'Đã nhận hàng', completed: order.status === 'delivered' }
      );
    } else {
      timeline.push(
        { status: 'pending', label: 'Đã lên đơn', completed: true },
        { status: 'active', label: 'Đang thuê', completed: order.status === 'active' || order.status === 'returned' || order.status === 'overdue' },
        { status: 'returned', label: 'Đã trả', completed: order.status === 'returned' }
      );
    }

    if (order.status === 'cancelled') {
      return (
        <div className="order-timeline">
          <h3>Trạng thái đơn hàng</h3>
          <div className="timeline-item cancelled">
            <div className="timeline-icon">
              <span>❌</span>
            </div>
            <div className="timeline-content">
              <h4>Đã hủy</h4>
              <p>Đơn hàng đã bị hủy</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="order-timeline">
        <h3>Trạng thái đơn hàng</h3>
        {timeline.map((item, index) => (
          <div 
            key={item.status} 
            className={`timeline-item ${item.completed ? 'completed' : 'pending'} ${order.status === item.status ? 'current' : ''}`}
          >
            <div className="timeline-icon">
              {item.completed ? '✓' : '○'}
            </div>
            <div className="timeline-content">
              <h4>{item.label}</h4>
              {order.status === item.status && (
                <p className="current-status">Trạng thái hiện tại</p>
              )}
            </div>
            {index < timeline.length - 1 && <div className="timeline-line" />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="order-detail">
      <BackButton text="Quay lại danh sách" onClick={onBack} />
      
      <div className="detail-header">
        <h1>Chi tiết đơn hàng</h1>
        <div className="order-id">Mã đơn: {order.id}</div>
        <span className={`status-badge ${getStatusClass(order.status)}`}>
          {getStatusText(order.status, order.type)}
        </span>
      </div>

      <div className="detail-content">
        <div className="order-items-section">
          <h3>Sản phẩm</h3>
          {order.items.map((item, index) => (
            <div key={index} className="detail-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Số lượng: {item.quantity}</p>
                <p className="item-price">
                  {item.price.toLocaleString('vi-VN')} đ
                </p>
              </div>
              <div className="item-total">
                {(item.price * item.quantity).toLocaleString('vi-VN')} đ
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h3>Tóm tắt đơn hàng</h3>
          <div className="summary-row">
            <span>Tổng tiền hàng:</span>
            <span>{order.total.toLocaleString('vi-VN')} đ</span>
          </div>
          {order.deposit && (
            <div className="summary-row">
              <span>Tiền cọc:</span>
              <span>{order.deposit.toLocaleString('vi-VN')} đ</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Thành tiền:</span>
            <span className="total-amount">
              {order.total.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </div>

        {renderRentalInfo()}
        {renderShippingInfo()}
        {renderOrderTimeline()}

        <div className="order-actions">
          {(order.status === 'pending' || order.status === 'shipping') && (
            <button 
              className="cancel-order-btn"
              onClick={handleCancelOrder}
            >
              Hủy đơn hàng
            </button>
          )}
          {order.type === 'rental' && order.status === 'active' && (
            <button className="extend-rental-btn">
              Gia hạn thuê
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;