import React, { useState } from 'react';
import { AlertCircle, X, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const EmailVerificationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const { isEmailVerified, resendVerificationEmail } = useAuth();

  if (!isVisible || isEmailVerified) return null;

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail();
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-bolt-blue/10 border-l-4 border-bolt-blue p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-bolt-blue" />
          <div>
            <p className="text-white">Please verify your email address</p>
            <p className="text-sm text-bolt-gray-300">
              Check your inbox for the verification link or{' '}
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-bolt-blue hover:text-bolt-purple transition-colors"
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'click here to resend'
                )}
              </button>
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-bolt-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;