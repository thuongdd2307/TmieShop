import React, { useState, useEffect } from 'react';
import './OtpVerification.css';
import BackButton from './BackButton';

const OtpVerification = ({ email, onVerify, onResend, onBack, currentLanguage, translations }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      alert(translations[currentLanguage].otpRequired);
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      // For demo, accept any 6-digit code
      if (otpCode.length === 6) {
        onVerify(otpCode);
      } else {
        alert(translations[currentLanguage].otpInvalid);
      }
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimeLeft(60);
    onResend();
    
    // Restart timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-verification-container">
      <div className="otp-card">
        <div className="otp-header">
          <BackButton
            text=""
            onClick={onBack}
            className="minimal"
            showIcon={true}
          />
          <h2>{translations[currentLanguage].verifyEmail}</h2>
        </div>

        <div className="otp-content">
          <p className="otp-description">
            {translations[currentLanguage].otpDescription}
          </p>
          <p className="otp-email">{email}</p>

          <form onSubmit={handleSubmit} className="otp-form">
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  placeholder={translations[currentLanguage].otpPlaceholder[0]}
                />
              ))}
            </div>

            <button
              type="submit"
              className={`otp-verify-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || otp.join('').length !== 6}
            >
              {isLoading ? (
                <span className="otp-spinner"></span>
              ) : (
                translations[currentLanguage].verifyButton
              )}
            </button>
          </form>

          <div className="otp-resend">
            <p>
              {translations[currentLanguage].didntReceiveCode}{' '}
              <button
                className={`resend-link ${canResend ? 'active' : 'disabled'}`}
                onClick={handleResend}
                disabled={!canResend}
              >
                {translations[currentLanguage].resendCode}
              </button>
            </p>
            {!canResend && (
              <p className="resend-timer">
                {formatTime(timeLeft)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;