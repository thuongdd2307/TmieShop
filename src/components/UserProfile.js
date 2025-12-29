import "./UserProfile.css";

export default function UserProfile() {
  return (
    <div className="user-profile-page">
      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <h3 className="sidebar-title">Cài đặt</h3>
          <ul className="sidebar-menu">
            <li className="active">Thông tin cá nhân</li>
            <li>Phương thức thanh toán</li>
            <li>Hoạt động đăng nhập</li>
            <li>Đổi mật khẩu</li>
            <li>Kết nối mạng xã hội</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
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
        </main>
      </div>
    </div>
  );
}
