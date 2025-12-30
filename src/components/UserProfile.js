import { useState } from "react";
import "./UserProfile.css";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  const menuItems = [
    { id: "personal", label: "Thông tin cá nhân" },
    { id: "payment", label: "Phương thức thanh toán" },
    { id: "activity", label: "Hoạt động đăng nhập" },
    { id: "password", label: "Đổi mật khẩu" },
    { id: "social", label: "Kết nối mạng xã hội" },
  ];

  const renderPersonalInfo = () => (
    <>
      {/* Header */}
      <div className="profile-header">
        <div className="avatar-wrapper">
          <img
            src="https://i.pravatar.cc/300"
            alt="avatar"
          />
        </div>
        <div className="header-info">
          <h2>Dolores Manlin</h2>
          <p>I am Professional Graphic Designer</p>
          <div className="social-icons">
            <span>🌐</span>
            <span>🐦</span>
            <span>💼</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="profile-card">
        <h3>Thông tin cá nhân</h3>

        <div className="info-grid">
          <div className="info-item">
            <label>Họ và tên</label>
            <span>Dolores Manlin</span>
          </div>

          <div className="info-item">
            <label>Email</label>
            <span>dolores@gmail.com</span>
          </div>

          <div className="info-item">
            <label>Số điện thoại</label>
            <span>+84 0987 654 321</span>
          </div>

          <div className="info-item">
            <label>Ngày sinh</label>
            <span>29/12/1997</span>
          </div>

          <div className="info-item full">
            <label>Giới thiệu</label>
            <span>
              Creative designer with more than 5 years of experience in
              branding, UI/UX and illustration.
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const renderPaymentMethods = () => (
    <div className="profile-card">
      <h3>Phương thức thanh toán</h3>
      
      <div className="payment-methods">
        <div className="payment-method">
          <div className="payment-icon">💳</div>
          <div className="payment-info">
            <h4>Thẻ Visa kết thúc với 4242</h4>
            <p>Hết hạn: 12/2025</p>
          </div>
          <div className="payment-actions">
            <button className="btn-edit">Sửa</button>
            <button className="btn-delete">Xóa</button>
          </div>
        </div>

        <div className="payment-method">
          <div className="payment-icon">🏦</div>
          <div className="payment-info">
            <h4>Tài khoản ngân hàng</h4>
            <p>Ngân hàng Vietcombank - 123456789</p>
          </div>
          <div className="payment-actions">
            <button className="btn-edit">Sửa</button>
            <button className="btn-delete">Xóa</button>
          </div>
        </div>

        <div className="payment-method">
          <div className="payment-icon">📱</div>
          <div className="payment-info">
            <h4>Ví MoMo</h4>
            <p>0987654321</p>
          </div>
          <div className="payment-actions">
            <button className="btn-edit">Sửa</button>
            <button className="btn-delete">Xóa</button>
          </div>
        </div>

        <button className="btn-add-payment">+ Thêm phương thức thanh toán</button>
      </div>
    </div>
  );

  const renderLoginActivity = () => (
    <div className="profile-card">
      <h3>Hoạt động đăng nhập</h3>
      
      <div className="login-activity">
        <div className="activity-item">
          <div className="activity-icon">🖥️</div>
          <div className="activity-info">
            <h4>Windows - Chrome</h4>
            <p>IP: 192.168.1.1</p>
            <p className="activity-time">Đăng nhập lúc: 30/12/2024 10:30</p>
          </div>
          <div className="activity-status current">Hiện tại</div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">📱</div>
          <div className="activity-info">
            <h4>iPhone - Safari</h4>
            <p>IP: 192.168.1.2</p>
            <p className="activity-time">Đăng nhập lúc: 29/12/2024 15:45</p>
          </div>
          <div className="activity-status">Đã đăng xuất</div>
        </div>

        <div className="activity-item">
          <div className="activity-icon">💻</div>
          <div className="activity-info">
            <h4>MacBook - Firefox</h4>
            <p>IP: 192.168.1.3</p>
            <p className="activity-time">Đăng nhập lúc: 28/12/2024 09:15</p>
          </div>
          <div className="activity-status">Đã đăng xuất</div>
        </div>
      </div>
    </div>
  );

  const renderChangePassword = () => (
    <div className="profile-card">
      <h3>Đổi mật khẩu</h3>
      
      <form className="password-form">
        <div className="form-group">
          <label>Mật khẩu hiện tại</label>
          <input type="password" placeholder="Nhập mật khẩu hiện tại" />
        </div>

        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input type="password" placeholder="Nhập mật khẩu mới" />
        </div>

        <div className="form-group">
          <label>Xác nhận mật khẩu mới</label>
          <input type="password" placeholder="Xác nhận mật khẩu mới" />
        </div>

        <div className="password-requirements">
          <h4>Mật khẩu phải chứa:</h4>
          <ul>
            <li>Ít nhất 8 ký tự</li>
            <li>Ít nhất 1 chữ hoa</li>
            <li>Ít nhất 1 chữ thường</li>
            <li>Ít nhất 1 số</li>
            <li>Ít nhất 1 ký tự đặc biệt</li>
          </ul>
        </div>

        <button type="submit" className="btn-save-password">Lưu thay đổi</button>
      </form>
    </div>
  );

  const renderSocialConnections = () => (
    <div className="profile-card">
      <h3>Kết nối mạng xã hội</h3>
      
      <div className="social-connections">
        <div className="social-item connected">
          <div className="social-icon">📘</div>
          <div className="social-info">
            <h4>Facebook</h4>
            <p>Đã kết nối với tài khoản dolores.manlin</p>
          </div>
          <button className="btn-disconnect">Ngắt kết nối</button>
        </div>

        <div className="social-item">
          <div className="social-icon">📷</div>
          <div className="social-info">
            <h4>Instagram</h4>
            <p>Chưa kết nối</p>
          </div>
          <button className="btn-connect">Kết nối</button>
        </div>

        <div className="social-item connected">
          <div className="social-icon">🐦</div>
          <div className="social-info">
            <h4>Twitter</h4>
            <p>Đã kết nối với tài khoản @dolores_design</p>
          </div>
          <button className="btn-disconnect">Ngắt kết nối</button>
        </div>

        <div className="social-item">
          <div className="social-icon">💼</div>
          <div className="social-info">
            <h4>LinkedIn</h4>
            <p>Chưa kết nối</p>
          </div>
          <button className="btn-connect">Kết nối</button>
        </div>

        <div className="social-item">
          <div className="social-icon">🎨</div>
          <div className="social-info">
            <h4>Behance</h4>
            <p>Chưa kết nối</p>
          </div>
          <button className="btn-connect">Kết nối</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfo();
      case "payment":
        return renderPaymentMethods();
      case "activity":
        return renderLoginActivity();
      case "password":
        return renderChangePassword();
      case "social":
        return renderSocialConnections();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="user-profile-page">
      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <h3 className="sidebar-title">Cài đặt</h3>
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={activeTab === item.id ? "active" : ""}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
