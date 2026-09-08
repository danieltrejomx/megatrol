import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Heart, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Toast.css';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useAuth();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  return createPortal(
    <div className="global-toast-container">
      <div className="global-toast-card">
        <div className="global-toast-icon">
          <Heart size={18} fill="#f43f5e" color="#f43f5e" />
        </div>
        <span className="global-toast-text">{toast.message}</span>
        {toast.actionLabel && toast.onAction && (
          <button
            type="button"
            className="global-toast-action-btn"
            onClick={() => {
              hideToast();
              toast.onAction?.();
            }}
          >
            <span>{toast.actionLabel}</span>
            <ArrowRight size={14} />
          </button>
        )}
        <button
          type="button"
          className="global-toast-close"
          onClick={hideToast}
          aria-label="Cerrar notificación"
        >
          <X size={15} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Toast;
