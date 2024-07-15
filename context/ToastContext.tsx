import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastProps } from '../components/modals/Toast';

interface ToastContextProps {
  showToast: (type: ToastProps['type'], title: string, subtitle: string, position: ToastProps['position']) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = (type: ToastProps['type'], title: string, subtitle: string, position: ToastProps['position']) => {
    const existingToast = toasts.find(
      (toast) => toast.type === type && toast.title === title && toast.subtitle === subtitle && toast.position === position
    );

    if (existingToast) {
      existingToast.timestamp = Date.now(); // Update timestamp to trigger re-render
      setToasts([...toasts]); // Update state to trigger re-render
    } else {
      setToasts((prevToasts) => [
        ...prevToasts,
        {
          id: Date.now(), // Unique ID (for key prop)
          type,
          title,
          subtitle,
          position,
          timestamp: Date.now(), // Timestamp to track updates
          onDismiss: () => dismissToast(Date.now()), // Provide dismiss callback
        },
      ]);
    }
  };

  const dismissToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
