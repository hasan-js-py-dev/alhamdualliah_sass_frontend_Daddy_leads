import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Store auth token
          if (data.data?.token) {
            localStorage.setItem('authToken', data.data.token);
          }

          setStatus('success');
          setMessage('Email verified successfully! Redirecting to dashboard...');

          // Refresh auth state and redirect
          await refreshUser();
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 500);
        } else {
          setStatus('error');
          setMessage(data.message || 'Email verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <>
      <Helmet>
        <title>Verify Email - Daddy Leads</title>
        <meta name="description" content="Verify your email address to access Daddy Leads platform" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#faf8f0' }}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#14F195] via-[#00D4FF] to-[#9945FF] flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              DL
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            {status === 'loading' && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="w-16 h-16 text-[#6366f1] animate-spin" />
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#411c78' }}>
                  Verifying Email
                </h1>
                <p className="text-gray-600">{message}</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#411c78' }}>
                  Success!
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-center">
                  <div className="w-8 h-8">
                    <Loader2 className="w-8 h-8 text-[#6366f1] animate-spin" />
                  </div>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: '#411c78' }}>
                  Verification Failed
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <Button
                  onClick={() => navigate('/access?p=login')}
                  className="w-full"
                  style={{ backgroundColor: '#6366f1', color: 'white' }}
                >
                  Go to Login
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
