import React, { useState, useEffect } from 'react';
import './Login.css';
import CreateAccount from './CreateAccount';
import OtpVerification from './OtpVerification';
import WelcomePopup from './WelcomePopup';
import BackButton from './BackButton';
import translations from '../translations/translations';

const Login = () => {
  const [currentView, setCurrentView] = useState('login'); // login, create-account, otp, welcome
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setIsAnimated(true);
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

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
    
    setTimeout(() => {
      setIsLoading(false);
      alert(translations[currentLanguage].loginSuccessful);
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const handleCreateAccount = (accountData) => {
    setUserEmail(accountData.email);
    setCurrentView('otp');
  };

  const handleOtpVerified = (otpCode) => {
    setCurrentView('welcome');
  };

  const handleResendOtp = () => {
    console.log('Resending OTP to:', userEmail);
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleCloseWelcome = () => {
    setCurrentView('login');
  };

  const handleCreateAccountClick = () => {
    setCurrentView('create-account');
  };

  // Render different views based on currentView state
  if (currentView === 'create-account') {
    return (
      <div className={`fashion-login-container ${isAnimated ? 'animate' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Header with theme and language switchers */}
        <div className="top-bar">
          <BackButton text="Trang chủ" className="minimal" />
          <div className="language-selector">
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="language-dropdown"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <CreateAccount 
          onBack={handleBackToLogin}
          onSubmit={handleCreateAccount}
          currentLanguage={currentLanguage}
          translations={translations}
        />
      </div>
    );
  }

  if (currentView === 'otp') {
    return (
      <div className={`fashion-login-container ${isAnimated ? 'animate' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Header with theme and language switchers */}
        <div className="top-bar">
          <BackButton text="Trang chủ" className="minimal" />
          <div className="language-selector">
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="language-dropdown"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <OtpVerification 
          email={userEmail}
          onVerify={handleOtpVerified}
          onResend={handleResendOtp}
          onBack={handleBackToLogin}
          currentLanguage={currentLanguage}
          translations={translations}
        />
      </div>
    );
  }

  if (currentView === 'welcome') {
    return (
      <WelcomePopup 
        onClose={handleCloseWelcome}
        currentLanguage={currentLanguage}
        translations={translations}
      />
    );
  }

  return (
    <div className={`fashion-login-container ${isAnimated ? 'animate' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Header with theme and language switchers */}
      <div className="top-bar">
        <BackButton text="Trang chủ" className="minimal" />
        <div className="language-selector">
          <select 
            value={currentLanguage} 
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className="language-dropdown"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="fashion-login-wrapper">
        {/* Left side - Hero Image */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-image">
              <div className="image-overlay"></div>
              <div className="hero-text">
                <h1>{translations[currentLanguage].welcomeToTMie}</h1>
                <p>{translations[currentLanguage].discoverFashion}</p>
                <div className="feature-highlights">
                  <div className="feature-item">
                    <span className="feature-icon">👗</span>
                    <span>{translations[currentLanguage].premiumCollections}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✨</span>
                    <span>{translations[currentLanguage].exclusiveDesigns}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🚚</span>
                    <span>{translations[currentLanguage].fastDelivery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="login-section">
          <div className="login-card-fashion">
            <div className="brand-header">
              <div className="brand-logo">
                <span className="logo-text-fashion">TMie</span>
                <span className="logo-subtitle">Fashion</span>
              </div>
              <div className="brand-tagline">Style Redefined</div>
            </div>

            <div className="login-header-fashion">
              <h2 className="login-title-fashion">{translations[currentLanguage].signIn}</h2>
              <p className="login-subtitle-fashion">{translations[currentLanguage].accessWardrobe}</p>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login-container">
              <button 
                className="social-btn google-btn"
                onClick={() => handleSocialLogin('Google')}
              >
                <span className="social-icon">🔍</span>
                {translations[currentLanguage].continueWithGoogle}
              </button>
              <button 
                className="social-btn facebook-btn"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <span className="social-icon">📘</span>
                {translations[currentLanguage].continueWithFacebook}
              </button>
              <button 
                className="social-btn apple-btn"
                onClick={() => handleSocialLogin('Apple')}
              >
                <span className="social-icon">🍎</span>
                {translations[currentLanguage].continueWithApple}
              </button>
            </div>

            <div className="divider">
              <span>{translations[currentLanguage].or}</span>
            </div>

            <form className="login-form-fashion" onSubmit={handleSubmit}>
              <div className="form-group-fashion">
                <label htmlFor="email" className="form-label-fashion">
                  {translations[currentLanguage].emailAddress}
                </label>
                <div className="input-container-fashion">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input-fashion ${errors.email ? 'error' : ''}`}
                    placeholder={translations[currentLanguage].enterEmail}
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="error-message-fashion">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-group-fashion">
                <label htmlFor="password" className="form-label-fashion">
                  {translations[currentLanguage].password}
                </label>
                <div className="input-container-fashion">
                  <div className="password-input-wrapper-fashion">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className={`form-input-fashion ${errors.password ? 'error' : ''}`}
                      placeholder={translations[currentLanguage].enterPassword}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle-fashion"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="error-message-fashion">{errors.password}</span>
                  )}
                </div>
              </div>

              <div className="form-options-fashion">
                <label className="checkbox-container-fashion">
                  <input type="checkbox" name="remember" />
                  <span className="checkmark-fashion"></span>
                  {translations[currentLanguage].rememberMe}
                </label>
                <button type="button" className="forgot-password-fashion">
                  {translations[currentLanguage].forgotPassword}
                </button>
              </div>

              <button
                type="submit"
                className={`login-button-fashion ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner-fashion"></span>
                ) : (
                  translations[currentLanguage].signInButton
                )}
              </button>
            </form>

            <div className="login-footer-fashion">
              <div className="signup-text-fashion">
                {translations[currentLanguage].newToTMie} <button type="button" className="signup-link-fashion" onClick={handleCreateAccountClick}>{translations[currentLanguage].createAccount}</button>
              </div>
              <div className="terms-text">
                {translations[currentLanguage].termsAgreement} <button className="terms-link">{translations[currentLanguage].terms}</button> và <button className="terms-link">{translations[currentLanguage].privacyPolicy}</button>
              </div>
            </div>

            {/* Additional Features */}
            <div className="additional-features">
              <div className="security-badges">
                <span className="security-badge">🔒 {translations[currentLanguage].secureLogin}</span>
                <span className="security-badge">🛡️ {translations[currentLanguage].sslProtected}</span>
                <span className="security-badge">✅ {translations[currentLanguage].verified}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
    </div>
  );
};

export default Login;