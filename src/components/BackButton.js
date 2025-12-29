import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ 
  text = 'Quay lại', 
  className = '', 
  onClick,
  showIcon = true,
  style = {}
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      className={`back-button ${className}`}
      onClick={handleClick}
      style={style}
    >
      {showIcon && <span className="back-icon">←</span>}
      <span className="back-text">{text}</span>
    </button>
  );
};

export default BackButton;