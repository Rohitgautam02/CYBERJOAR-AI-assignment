import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: ToastNotification
 */

const ToastNotification = ({ toast, onDone }) => {
  const { message, type = 'success' } = toast;
  
  const config = {
    success: {
      color: '#00e5c0',
      icon: <CheckCircle2 size={18} className="text-accent-teal" />,
      duration: 3500
    },
    error: {
      color: '#ef4444',
      icon: <AlertCircle size={18} className="text-accent-red" />,
      duration: 5000
    },
    info: {
      color: '#3b82f6',
      icon: <Info size={18} className="text-accent-blue" />,
      duration: 3500
    }
  };

  const current = config[type] || config.success;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, current.duration);

    return () => clearTimeout(timer);
  }, [onDone, current.duration]);

  return (
    <div className="fixed bottom-6 right-4 z-[9999] w-[320px] bg-bg-elevated border border-border-dim rounded-sm shadow-2xl overflow-hidden animate-slide-in">
      <div 
        className="absolute left-0 top-0 bottom-0 w-1" 
        style={{ backgroundColor: current.color }}
      />
      
      <div className="flex items-start gap-3 p-4">
        <div className="pt-0.5">
          {current.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-text-primary leading-tight">
            {message}
          </p>
        </div>

        <button 
          onClick={onDone}
          className="text-text-dim hover:text-text-primary transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-border-dim w-full overflow-hidden">
        <div 
          className="h-full transition-all linear"
          style={{ 
            backgroundColor: current.color,
            width: '100%',
            animation: `shrink ${current.duration}ms linear forwards`
          }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
    </div>
  );
};

export default ToastNotification;


