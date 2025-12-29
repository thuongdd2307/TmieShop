import React, { useState } from 'react';
import BackButton from './BackButton';
import OrderDetail from './OrderDetail';
import ConfirmDialog from './ConfirmDialog';
import translations from '../translations/translations';
import './OrderManagement.css';

const OrderManagement = ({ currentLanguage = 'vi' }) => {
  const [activeTab, setActiveTab] = useState('purchase');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'default',
    title: '',
    message: '',
    onConfirm: null
  });
  const [orders, setOrders] = useState({
    purchase: [
      {
        id: 'PO001',
        date: '2024-01-15',
        status: 'pending',
        items: [
          { name: 'Áo sơ mi trắng', quantity: 2, price: 450000, image: 'https://via.placeholder.com/60x60?text=Áo+sơ+mi' },
          { name: 'Quần jean đen', quantity: 1, price: 750000, image: 'https://via.placeholder.com/60x60?text=Quần+jean' }
        ],
        total: 1650000,
        shippingAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        paymentMethod: 'COD'
      },
      {
        id: 'PO002',
        date: '2024-01-10',
        status: 'shipping',
        items: [
          { name: 'Váy hoa nhí', quantity: 1, price: 890000, image: 'https://via.placeholder.com/60x60?text=Váy+hoa' }
        ],
        total: 890000,
        shippingAddress: '456 Lê Lợi, Quận 3, TP.HCM',
        paymentMethod: 'Chuyển khoản'
      },
      {
        id: 'PO003',
        date: '2024-01-05',
        status: 'delivered',
        items: [
          { name: 'Áo khoác bomber', quantity: 1, price: 1200000, image: 'https://via.placeholder.com/60x60?text=Áo+khoác' }
        ],
        total: 1200000,
        shippingAddress: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
        paymentMethod: 'Thẻ tín dụng'
      }
    ],
    rental: [
      {
        id: 'RO001',
        date: '2024-01-20',
        status: 'active',
        items: [
          { name: 'Váy dạ hội đỏ', quantity: 1, price: 500000, image: 'https://via.placeholder.com/60x60?text=Váy+đỏ' }
        ],
        total: 500000,
        deposit: 2000000,
        rentalPeriod: {
          startDate: '2024-01-20',
          endDate: '2024-01-27'
        },
        shippingAddress: '321 Võ Văn Kiệt, Quận 1, TP.HCM',
        paymentMethod: 'Chuyển khoản'
      },
      {
        id: 'RO002',
        date: '2024-01-18',
        status: 'overdue',
        items: [
          { name: 'Suit công sở', quantity: 1, price: 300000, image: 'https://via.placeholder.com/60x60?text=Suit' }
        ],
        total: 300000,
        deposit: 3000000,
        rentalPeriod: {
          startDate: '2024-01-18',
          endDate: '2024-01-25'
        },
        shippingAddress: '654 Đồng Khởi, Quận 1, TP.HCM',
        paymentMethod: 'COD'
      },
      {
        id: 'RO003',
        date: '2024-01-10',
        status: 'returned',
        items: [
          { name: 'Áo dài truyền thống', quantity: 1, price: 400000, image: 'https://via.placeholder.com/60x60?text=Áo+dài' }
        ],
        total: 400000,
        deposit: 1500000,
        rentalPeriod: {
          startDate: '2024-01-10',
          endDate: '2024-01-17'
        },
        shippingAddress: '987 Nguyễn Trãi, Quận 1, TP.HCM',
        paymentMethod: 'Chuyển khoản'
      }
    ]
  });

  const getDaysUntilReturn = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusText = (status, orderType) => {
    if (orderType === 'purchase') {
      switch (status) {
        case 'pending': return 'Đã lên đơn';
        case 'shipping': return 'Đang vận chuyển';
        case 'delivered': return 'Đã nhận hàng';
        default: return status;
      }
    } else {
      switch (status) {
        case 'pending': return 'Đã lên đơn';
        case 'active': return 'Đang thuê';
        case 'overdue': return 'Quá hạn';
        case 'returned': return 'Đã trả';
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
      default: return '';
    }
  };

  const getFilterOptions = (orderType) => {
    if (orderType === 'purchase') {
      return [
        { value: 'all', label: 'Tất cả' },
        { value: 'pending', label: 'Đã lên đơn' },
        { value: 'shipping', label: 'Đang vận chuyển' },
        { value: 'delivered', label: 'Đã nhận hàng' },
        { value: 'cancelled', label: 'Đã hủy' }
      ];
    } else {
      return [
        { value: 'all', label: 'Tất cả' },
        { value: 'pending', label: 'Đã lên đơn' },
        { value: 'active', label: 'Đang thuê' },
        { value: 'overdue', label: 'Quá hạn' },
        { value: 'returned', label: 'Đã trả' },
        { value: 'cancelled', label: 'Đã hủy' }
      ];
    }
  };

  const getFilteredOrders = () => {
    if (statusFilter === 'all') {
      return orders[activeTab];
    }
    return orders[activeTab].filter(order => order.status === statusFilter);
  };

  const handleCancelOrder = (orderId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Xác nhận hủy đơn hàng',
      message: 'Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.',
      onConfirm: () => {
        setOrders(prev => ({
          ...prev,
          [activeTab]: prev[activeTab].map(order =>
            order.id === orderId
              ? { ...order, status: 'cancelled' }
              : order
          )
        }));
      }
    });
  };

  const handleExtendRental = (orderId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'warning',
      title: 'Gia hạn thuê',
      message: 'Bạn có muốn gia hạn thời gian thuê cho đơn hàng này?',
      onConfirm: () => {
        // Here you would implement the rental extension logic
        console.log('Extend rental for order:', orderId);
      }
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

  const handleViewDetail = (order) => {
    setSelectedOrder({ ...order, type: activeTab });
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return (
      <div className="order-management">
        <OrderDetail 
          order={selectedOrder} 
          onBack={handleBackToList}
          currentLanguage={currentLanguage}
          translations={translations}
          onCancelOrder={handleCancelOrder}
        />
      </div>
    );
  }

  return (
    <div className="order-management">
      <BackButton text="Quay lại" />
      
      <h1 className="page-title">Quản lý đơn hàng</h1>
      
      <div className="order-tabs">
        <button
          className={`tab-button ${activeTab === 'purchase' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('purchase');
            setStatusFilter('all');
          }}
        >
          Đơn mua
        </button>
        <button
          className={`tab-button ${activeTab === 'rental' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('rental');
            setStatusFilter('all');
          }}
        >
          Đơn thuê
        </button>
      </div>

      <div className="status-filter">
        <label htmlFor="status-select">Lọc theo trạng thái:</label>
        <select
          id="status-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {getFilterOptions(activeTab).map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="orders-list">
        {getFilteredOrders().length === 0 ? (
          <div className="no-orders">
            <p>Chưa có đơn hàng nào</p>
          </div>
        ) : (
          getFilteredOrders().map(order => {
            // Calculate days until return for rental orders
            let daysRemaining = null;
            if (activeTab === 'rental' && order.status === 'active' && order.rentalPeriod) {
              daysRemaining = getDaysUntilReturn(order.rentalPeriod.endDate);
            }

            return (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Mã đơn hàng: {order.id}</h3>
                  <p className="order-date">{order.date}</p>
                  {activeTab === 'rental' && order.rentalPeriod && (
                    <p className="rental-period">
                      {order.rentalPeriod.startDate} - {order.rentalPeriod.endDate}
                    </p>
                  )}
                </div>
                <div className="order-status">
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status, activeTab)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Số lượng: {item.quantity}</p>
                      <p className="item-price">
                        {item.price.toLocaleString('vi-VN')} đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Tổng tiền:</span>
                  <span className="total-amount">
                    {order.total.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                {order.deposit && (
                  <div className="summary-row">
                    <span>Tiền cọc:</span>
                    <span>{order.deposit.toLocaleString('vi-VN')} đ</span>
                  </div>
                )}
              </div>

              {/* Rental deadline warning */}
              {activeTab === 'rental' && order.status === 'active' && daysRemaining !== null && (
                <div className={`rental-deadline ${daysRemaining <= 3 ? 'urgent' : 'normal'}`}>
                  {daysRemaining > 0 ? (
                    <p>Còn {daysRemaining} ngày đến hạn trả</p>
                  ) : (
                    <p className="overdue">Quá hạn {Math.abs(daysRemaining)} ngày</p>
                  )}
                </div>
              )}

              <div className="order-actions">
                <button
                  className="view-detail-btn"
                  onClick={() => handleViewDetail(order)}
                >
                  Xem chi tiết
                </button>
                {(order.status === 'pending' || (activeTab === 'purchase' && order.status === 'shipping')) && (
                  <button
                    className="cancel-order-btn"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Hủy đơn
                  </button>
                )}
                {activeTab === 'rental' && order.status === 'active' && (
                  <button
                    className="extend-rental-btn"
                    onClick={() => handleExtendRental(order.id)}
                  >
                    Gia hạn
                  </button>
                )}
              </div>
            </div>
            );
          })
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.type === 'danger' ? 'Hủy đơn' : 'Xác nhận'}
        cancelText={confirmDialog.type === 'danger' ? 'Đóng' : 'Hủy'}
        type={confirmDialog.type}
      />
    </div>
  );
};

export default OrderManagement;