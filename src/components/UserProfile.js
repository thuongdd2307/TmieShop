import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import translations from '../translations/translations';

const UserProfile = ({ currentLanguage = 'vi', translations: propsTranslations }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  
  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    dateOfBirth: '1990-01-01',
    gender: 'male'
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Address list state
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
      isDefault: true
    },
    {
      id: 2,
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '456 Đường DEF, Phường GHI, Quận 3, TP. Hồ Chí Minh',
      isDefault: false
    }
  ]);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    isDefault: false
  });

  // Error states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = propsTranslations || translations[currentLanguage] || translations.vi;

  // Custom translations for profile page
  const profileTranslations = {
    vi: {
      profile: 'Hồ sơ cá nhân',
      personalInfo: 'Thông tin cá nhân',
      changePassword: 'Đổi mật khẩu',
      addressManagement: 'Quản lý địa chỉ',
      firstName: 'Họ',
      lastName: 'Tên',
      email: 'Email',
      phone: 'Số điện thoại',
      dateOfBirth: 'Ngày sinh',
      gender: 'Giới tính',
      male: 'Nam',
      female: 'Nữ',
      other: 'Khác',
      edit: 'Chỉnh sửa',
      save: 'Lưu',
      cancel: 'Hủy',
      currentPassword: 'Mật khẩu hiện tại',
      newPassword: 'Mật khẩu mới',
      confirmPassword: 'Xác nhận mật khẩu',
      addAddress: 'Thêm địa chỉ mới',
      addressName: 'Tên người nhận',
      addressPhone: 'Số điện thoại người nhận',
      addressDetail: 'Địa chỉ chi tiết',
      setDefault: 'Đặt làm mặc định',
      remove: 'Xóa',
      default: 'Mặc định',
      updateSuccess: 'Cập nhật thành công!',
      passwordChangeSuccess: 'Đổi mật khẩu thành công!',
      addressAddedSuccess: 'Thêm địa chỉ thành công!',
      addressUpdatedSuccess: 'Cập nhật địa chỉ thành công!',
      addressRemovedSuccess: 'Xóa địa chỉ thành công!',
      passwordRequired: 'Mật khẩu là bắt buộc',
      passwordLength: 'Mật khẩu phải có ít nhất 8 ký tự',
      passwordMismatch: 'Mật khẩu không khớp',
      phoneRequired: 'Số điện thoại là bắt buộc',
      phoneInvalid: 'Số điện thoại không hợp lệ',
      addressRequired: 'Địa chỉ là bắt buộc',
      nameRequired: 'Tên là bắt buộc',
      emailRequired: 'Email là bắt buộc',
      emailInvalid: 'Email không hợp lệ'
    },
    en: {
      profile: 'User Profile',
      personalInfo: 'Personal Information',
      changePassword: 'Change Password',
      addressManagement: 'Address Management',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      addAddress: 'Add New Address',
      addressName: 'Recipient Name',
      addressPhone: 'Recipient Phone',
      addressDetail: 'Detailed Address',
      setDefault: 'Set as Default',
      remove: 'Remove',
      default: 'Default',
      updateSuccess: 'Update successful!',
      passwordChangeSuccess: 'Password changed successfully!',
      addressAddedSuccess: 'Address added successfully!',
      addressUpdatedSuccess: 'Address updated successfully!',
      addressRemovedSuccess: 'Address removed successfully!',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      phoneRequired: 'Phone is required',
      phoneInvalid: 'Invalid phone number',
      addressRequired: 'Address is required',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email'
    }
  };

  const pt = profileTranslations[currentLanguage] || profileTranslations.vi;

  useEffect(() => {
    // Clear success message after 3 seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Validate personal info
  const validatePersonalInfo = () => {
    const newErrors = {};
    
    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = pt.nameRequired;
    }
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = pt.nameRequired;
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = pt.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = pt.emailInvalid;
    }
    if (!personalInfo.phone.trim()) {
      newErrors.phone = pt.phoneRequired;
    } else if (!/^[0-9]{10,11}$/.test(personalInfo.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = pt.phoneInvalid;
    }
    
    return newErrors;
  };

  // Validate password change
  const validatePasswordChange = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = pt.passwordRequired;
    }
    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = pt.passwordRequired;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = pt.passwordLength;
    }
    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = pt.passwordRequired;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = pt.passwordMismatch;
    }
    
    return newErrors;
  };

  // Validate address
  const validateAddress = (address) => {
    const newErrors = {};
    
    if (!address.name.trim()) {
      newErrors.name = pt.nameRequired;
    }
    if (!address.phone.trim()) {
      newErrors.phone = pt.phoneRequired;
    } else if (!/^[0-9]{10,11}$/.test(address.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = pt.phoneInvalid;
    }
    if (!address.address.trim()) {
      newErrors.address = pt.addressRequired;
    }
    
    return newErrors;
  };

  // Handle personal info save
  const handlePersonalInfoSave = () => {
    const newErrors = validatePersonalInfo();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      setErrors({});
      setSuccessMessage(pt.updateSuccess);
    }, 1000);
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    const newErrors = validatePasswordChange();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
      setSuccessMessage(pt.passwordChangeSuccess);
    }, 1000);
  };

  // Handle add address
  const handleAddAddress = () => {
    const newErrors = validateAddress(newAddress);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const addressToAdd = {
        ...newAddress,
        id: Date.now()
      };
      
      // If setting as default, remove default from other addresses
      if (newAddress.isDefault) {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
      }
      
      setAddresses(prev => [...prev, addressToAdd]);
      setNewAddress({ name: '', phone: '', address: '', isDefault: false });
      setIsLoading(false);
      setIsAddingAddress(false);
      setErrors({});
      setSuccessMessage(pt.addressAddedSuccess);
    }, 1000);
  };

  // Handle edit address
  const handleEditAddress = (addressId) => {
    const address = addresses.find(addr => addr.id === addressId);
    if (address) {
      setNewAddress(address);
      setEditingAddressId(addressId);
      setIsAddingAddress(true);
    }
  };

  // Handle update address
  const handleUpdateAddress = () => {
    const newErrors = validateAddress(newAddress);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      // If setting as default, remove default from other addresses
      if (newAddress.isDefault) {
        setAddresses(prev => prev.map(addr => 
          addr.id === editingAddressId ? { ...addr, ...newAddress } : { ...addr, isDefault: false }
        ));
      } else {
        setAddresses(prev => prev.map(addr => 
          addr.id === editingAddressId ? { ...addr, ...newAddress } : addr
        ));
      }
      
      setNewAddress({ name: '', phone: '', address: '', isDefault: false });
      setIsLoading(false);
      setIsAddingAddress(false);
      setEditingAddressId(null);
      setErrors({});
      setSuccessMessage(pt.addressUpdatedSuccess);
    }, 1000);
  };

  // Handle remove address
  const handleRemoveAddress = (addressId) => {
    if (window.confirm(currentLanguage === 'vi' ? 'Bạn có chắc muốn xóa địa chỉ này?' : 'Are you sure you want to remove this address?')) {
      setIsLoading(true);
      setTimeout(() => {
        setAddresses(prev => prev.filter(addr => addr.id !== addressId));
        setIsLoading(false);
        setSuccessMessage(pt.addressRemovedSuccess);
      }, 500);
    }
  };

  // Handle set default address
  const handleSetDefaultAddress = (addressId) => {
    setIsLoading(true);
    setTimeout(() => {
      setAddresses(prev => prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      })));
      setIsLoading(false);
      setSuccessMessage(pt.updateSuccess);
    }, 500);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <BackButton text={t.backToHome || "Quay lại"} />
        <h1 className="profile-title">{pt.profile}</h1>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          {pt.personalInfo}
        </button>
        <button
          className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          {pt.changePassword}
        </button>
        <button
          className={`tab-button ${activeTab === 'address' ? 'active' : ''}`}
          onClick={() => setActiveTab('address')}
        >
          {pt.addressManagement}
        </button>
      </div>

      <div className="profile-content">
        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="tab-content">
            <div className="personal-info-section">
              <div className="section-header">
                <h2>{pt.personalInfo}</h2>
                {!isEditing && (
                  <button className="edit-button" onClick={() => setIsEditing(true)}>
                    {pt.edit}
                  </button>
                )}
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <label>{pt.firstName}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className={`info-input ${errors.firstName ? 'error' : ''}`}
                    />
                  ) : (
                    <span>{personalInfo.firstName}</span>
                  )}
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="info-item">
                  <label>{pt.lastName}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className={`info-input ${errors.lastName ? 'error' : ''}`}
                    />
                  ) : (
                    <span>{personalInfo.lastName}</span>
                  )}
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>

                <div className="info-item">
                  <label>{pt.email}</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      className={`info-input ${errors.email ? 'error' : ''}`}
                    />
                  ) : (
                    <span>{personalInfo.email}</span>
                  )}
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="info-item">
                  <label>{pt.phone}</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className={`info-input ${errors.phone ? 'error' : ''}`}
                    />
                  ) : (
                    <span>{personalInfo.phone}</span>
                  )}
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="info-item">
                  <label>{pt.dateOfBirth}</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                      className="info-input"
                    />
                  ) : (
                    <span>{personalInfo.dateOfBirth}</span>
                  )}
                </div>

                <div className="info-item">
                  <label>{pt.gender}</label>
                  {isEditing ? (
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({...personalInfo, gender: e.target.value})}
                      className="info-input"
                    >
                      <option value="male">{pt.male}</option>
                      <option value="female">{pt.female}</option>
                      <option value="other">{pt.other}</option>
                    </select>
                  ) : (
                    <span>
                      {personalInfo.gender === 'male' ? pt.male : 
                       personalInfo.gender === 'female' ? pt.female : pt.other}
                    </span>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="action-buttons">
                  <button 
                    className="save-button" 
                    onClick={handlePersonalInfoSave}
                    disabled={isLoading}
                  >
                    {isLoading ? '...' : pt.save}
                  </button>
                  <button 
                    className="cancel-button" 
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                  >
                    {pt.cancel}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Password Change Tab */}
        {activeTab === 'password' && (
          <div className="tab-content">
            <div className="password-section">
              <h2>{pt.changePassword}</h2>
              <form onSubmit={handlePasswordChange} className="password-form">
                <div className="form-group">
                  <label>{pt.currentPassword}</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className={`form-input ${errors.currentPassword ? 'error' : ''}`}
                  />
                  {errors.currentPassword && <span className="error-text">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label>{pt.newPassword}</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className={`form-input ${errors.newPassword ? 'error' : ''}`}
                  />
                  {errors.newPassword && <span className="error-text">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label>{pt.confirmPassword}</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? '...' : pt.save}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Address Management Tab */}
        {activeTab === 'address' && (
          <div className="tab-content">
            <div className="address-section">
              <div className="section-header">
                <h2>{pt.addressManagement}</h2>
                <button 
                  className="add-address-button"
                  onClick={() => {
                    setIsAddingAddress(true);
                    setEditingAddressId(null);
                    setNewAddress({ name: '', phone: '', address: '', isDefault: false });
                    setErrors({});
                  }}
                >
                  {pt.addAddress}
                </button>
              </div>

              {/* Address List */}
              <div className="address-list">
                {addresses.map(address => (
                  <div key={address.id} className="address-card">
                    <div className="address-header">
                      <h3>{address.name}</h3>
                      {address.isDefault && <span className="default-badge">{pt.default}</span>}
                    </div>
                    <div className="address-details">
                      <p><strong>{t.phone || 'Điện thoại'}:</strong> {address.phone}</p>
                      <p><strong>{t.address || 'Địa chỉ'}:</strong> {address.address}</p>
                    </div>
                    <div className="address-actions">
                      <button 
                        className="edit-address-button"
                        onClick={() => handleEditAddress(address.id)}
                      >
                        {pt.edit}
                      </button>
                      {!address.isDefault && (
                        <button 
                          className="set-default-button"
                          onClick={() => handleSetDefaultAddress(address.id)}
                        >
                          {pt.setDefault}
                        </button>
                      )}
                      <button 
                        className="remove-address-button"
                        onClick={() => handleRemoveAddress(address.id)}
                      >
                        {pt.remove}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Address Form */}
              {isAddingAddress && (
                <div className="add-address-form">
                  <h3>{editingAddressId ? pt.edit : pt.addAddress}</h3>
                  <div className="form-group">
                    <label>{pt.addressName}</label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>{pt.addressPhone}</label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label>{pt.addressDetail}</label>
                    <textarea
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                      className={`form-input ${errors.address ? 'error' : ''}`}
                      rows={3}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                      />
                      {pt.setDefault}
                    </label>
                  </div>

                  <div className="action-buttons">
                    <button 
                      className="save-button"
                      onClick={editingAddressId ? handleUpdateAddress : handleAddAddress}
                      disabled={isLoading}
                    >
                      {isLoading ? '...' : pt.save}
                    </button>
                    <button 
                      className="cancel-button"
                      onClick={() => {
                        setIsAddingAddress(false);
                        setEditingAddressId(null);
                        setNewAddress({ name: '', phone: '', address: '', isDefault: false });
                        setErrors({});
                      }}
                    >
                      {pt.cancel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;