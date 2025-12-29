import React from 'react';
import './WelcomePopup.css';

const WelcomePopup = ({ onClose, currentLanguage, translations }) => {
  const handleStartShopping = () => {
    onClose();
    // Navigate to shopping page or main app
    console.log('Navigate to shopping');
  };

  const handleExploreCollections = () => {
    onClose();
    // Navigate to collections page
    console.log('Navigate to collections');
  };

  return (
    <div className="welcome-popup-overlay">
      <div className="welcome-popup">
        <div className="welcome-header">
          <div className="welcome-icon">
            <span className="celebration-emoji">🎉</span>
          </div>
          <h2>{translations[currentLanguage].welcomeTitle}</h2>
        </div>

        <div className="welcome-content">
          <p className="welcome-message">
            {translations[currentLanguage].accountCreatedSuccess}
          </p>
          
          <div className="welcome-features">
            <div className="feature-badge">
              <span className="feature-icon">👗</span>
              <span>Exclusive Collections</span>
            </div>
            <div className="feature-badge">
              <span className="feature-icon">🎁</span>
              <span>Special Offers</span>
            </div>
            <div className="feature-badge">
              <span className="feature-icon">🚚</span>
              <span>Fast Delivery</span>
            </div>
          </div>

          <div className="welcome-actions">
            <button 
              className="welcome-button primary"
              onClick={handleStartShopping}
            >
              {translations[currentLanguage].startShopping}
            </button>
            <button 
              className="welcome-button secondary"
              onClick={handleExploreCollections}
            >
              {translations[currentLanguage].exploreCollections}
            </button>
          </div>
        </div>

        <button className="welcome-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;