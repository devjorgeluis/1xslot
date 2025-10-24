import React from 'react';
import '../../css/Auth.css';

const ConfirmLogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="auth-error-modal-overlay">
            <div className="confirm-logout-modal">
                <h3 className="confirm-title">Do you want to log out?</h3>
                <p className="confirm-sub">We're sorry to see you go.</p>

                <button className="confirm-btn stay" onClick={onClose}>
                    Stay here
                </button>

                <button className="confirm-btn exit" onClick={onConfirm}>
                    Exit
                </button>
            </div>
        </div>
    );
};

export default ConfirmLogoutModal;
