import React, { useState } from 'react';
import './CreateAccount.css';
import BackButton from './BackButton';

const CreateAccount = ({ onBack, onSubmit, currentLanguage, translations }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = translations[currentLanguage].nameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = translations[currentLanguage].emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translations[currentLanguage].validEmail;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = translations[currentLanguage].passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = translations[currentLanguage].passwordLength;
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = translations[currentLanguage].passwordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = translations[currentLanguage].passwordMismatch;
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(formData);
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialSignup = (provider) => {
    console.log(`Sign up with ${provider}`);
    // Implement social signup logic here
  };

  return (
    <div className="create-account-container">
      <div className="create-account-card">
        <div className="create-account-header">
          <BackButton
            text=""
            onClick={onBack}
            className="minimal"
            showIcon={true}
          />
          <h2>{translations[currentLanguage].createAccountTitle}</h2>
          <p>{translations[currentLanguage].joinFashion}</p>
        </div>

        {/* Social Signup Buttons */}
        <div className="social-signup-container">
          <button 
            className="social-btn google-btn"
            onClick={() => handleSocialSignup('Google')}
          >
            <span className="social-icon">🔍</span>
            {translations[currentLanguage].continueWithGoogle}
          </button>
          <button 
            className="social-btn facebook-btn"
            onClick={() => handleSocialSignup('Facebook')}
          >
            <span className="social-icon">📘</span>
            {translations[currentLanguage].continueWithFacebook}
          </button>
          <button 
            className="social-btn apple-btn"
            onClick={() => handleSocialSignup('Apple')}
          >
            <span className="social-icon">🍎</span>
            {translations[currentLanguage].continueWithApple}
          </button>
        </div>

        <div className="divider">
          <span>{translations[currentLanguage].or}</span>
        </div>

        <form className="create-account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              {translations[currentLanguage].fullName}
            </label>
            <div className="input-container">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder={translations[currentLanguage].enterFullName}
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {translations[currentLanguage].emailAddress}
            </label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder={translations[currentLanguage].enterEmail}
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              {translations[currentLanguage].password}
            </label>
            <div className="input-container">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder={translations[currentLanguage].enterPassword}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              {translations[currentLanguage].confirmPassword}
            </label>
            <div className="input-container">
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder={translations[currentLanguage].enterConfirmPassword}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" name="newsletter" />
              <span className="checkmark"></span>
              Subscribe to newsletter for exclusive offers
            </label>
          </div>

          <button
            type="submit"
            className={`create-account-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              translations[currentLanguage].createAccountButton
            )}
          </button>
        </form>

        <div className="create-account-footer">
          <p className="signin-text">
            {translations[currentLanguage].alreadyHaveAccount}{' '}
            <button type="button" className="signin-link" onClick={onBack}>
              {translations[currentLanguage].backToLogin}
            </button>
          </p>
          <p className="terms-text">
            By creating an account, you agree to our{' '}
            <button className="terms-link">Terms</button> and{' '}
            <button className="terms-link">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;