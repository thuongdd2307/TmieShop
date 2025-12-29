import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Xác nhận', 
  cancelText = 'Hủy',
  type = 'default' // 'default', 'danger', 'warning'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getDialogClass = () => {
    switch (type) {
      case 'danger':
        return 'confirm-dialog danger';
      case 'warning':
        return 'confirm-dialog warning';
      default:
        return 'confirm-dialog default';
    }
  };

  return (
    <div className="confirm-dialog-overlay">
      <div className={getDialogClass()}>
        <div className="dialog-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="dialog-body">
          <p>{message}</p>
        </div>
        
        <div className="dialog-footer">
          <button className="btn-cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button className={`btn-confirm ${type}`} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;