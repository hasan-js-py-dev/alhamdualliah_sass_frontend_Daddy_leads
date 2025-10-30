import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Check, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedTitle from '@/components/AnimatedTitle';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AccessPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('p') || 'login'; // 'login' or 'signup'
  const { user, loading: authLoading, login: authLogin } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendingEmail, setResendingEmail] = useState(false);

  // Redirect if already logged in with a delay for smooth transition
  useEffect(() => {
    if (!authLoading && user) {
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 3000);
    }
  }, [user, authLoading, navigate]);

  // Clear sensitive form data on unmount
  useEffect(() => {
    return () => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      setAgreeToTerms(false);
    };
  }, []);

  const switchMode = (newMode: string) => {
    setSearchParams({ p: newMode });
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/v1/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Verification email sent! Please check your inbox.');
        setShowErrorDialog(false);
      } else {
        toast.error(data.message || 'Failed to resend verification email.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setResendingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup' && !agreeToTerms) {
      toast.error('Please agree to the Terms and Conditions');
      return;
    }

    setLoading(true);

    // Add delay for smooth experience
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (mode === 'signup') {
        const result = await authService.signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          agreeToTerms,
        });

        if (result.success) {
          // Show success dialog
          setShowSuccessDialog(true);
          
          // Clear form data
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
          setAgreeToTerms(false);
        } else {
          toast.error(result.message || 'Signup failed. Please try again.');
        }
      } else {
        const result = await authLogin(formData.email, formData.password);

        if (result.success) {
          toast.success('Logged in successfully!');
          // Clear form data
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
          // Navigation will happen automatically via useEffect when user state updates
        } else {
          // Check if it's a "no account found" error
          if (result.message?.includes('NO_ACCOUNT_FOUND')) {
            setErrorMessage("You haven't created an account yet. To get access, please sign up.");
            setShowErrorDialog(true);
          }
          // Check if it's an email verification error
          else if (result.message?.includes('verify') || result.message?.includes('Email not verified')) {
            setErrorMessage('Error: You need to verify your email first. We have sent you a verification email to your email address.');
            setShowErrorDialog(true);
          } else {
            toast.error(result.message || 'Invalid email or password.');
          }
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const features = [
    {
      title: 'Real-Time B2B Data Enrichment',
      description: 'Access verified email addresses, phone numbers, and LinkedIn profiles instantly with our advanced data enrichment tools.',
    },
    {
      title: 'Multi-Platform Scraping',
      description: 'Extract valuable leads from LinkedIn Sales Navigator, Google Maps, Yelp, and major B2B databases with a single click.',
    },
    {
      title: 'Email Verification Built-In',
      description: 'Ensure deliverability with our integrated email verification system, reducing bounce rates by up to 95%.',
    },
    {
      title: 'Export & CRM Integration',
      description: 'Download your enriched data as CSV or sync directly to your favorite CRM platforms for seamless workflow.',
    },
  ];

  // Show loading state while checking authentication or if user is already logged in
  if (authLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf8f0' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#14F195] via-[#00D4FF] to-[#9945FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-4 animate-pulse">
            DL
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mode === 'signup' ? 'Create Account' : 'Login'} - Daddy Leads | B2B Lead Generation Platform</title>
        <meta name="description" content={mode === 'signup' ? 'Sign up for Daddy Leads to access powerful B2B data scraping, email verification, and lead generation tools. Get started free today.' : 'Sign in to Daddy Leads to access your B2B data scraping tools, email verification, and lead generation platform.'} />
      </Helmet>

      <div className="min-h-screen flex" style={{ backgroundColor: '#faf8f0' }}>
        {/* Left Column - Auth Form */}
        <div className="w-1/2 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link to="/" className="inline-block mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#14F195] via-[#00D4FF] to-[#9945FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                DL
              </div>
            </Link>

            <h1 className="text-3xl font-bold mb-8" style={{ color: '#411c78' }}>
              {mode === 'signup' ? 'Create your free account' : 'Welcome Back!'}
            </h1>

            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      autoComplete="given-name"
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      autoComplete="family-name"
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Signup with personal and business email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  autoComplete={mode === 'signup' ? 'email' : 'username'}
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    className="bg-white border-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="flex items-start space-x-2 mt-4">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-tight cursor-pointer"
                  >
                    I agree to the Terms and Conditions
                  </label>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-semibold mt-6"
                style={{ backgroundColor: '#6366f1', color: 'white' }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : mode === 'signup' ? 'Sign Up' : 'Login'}
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                {mode === 'signup' ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-[#6366f1] hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Need an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('signup')}
                      className="text-[#6366f1] hover:underline font-medium"
                    >
                      Create an account for free
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

        {/* Right Column - Features */}
        <div className="w-1/2 flex items-center justify-center px-12 py-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#411c78' }}>
              Close More Deals
            </h2>
            <h3 className="text-3xl font-bold mb-12">
              <AnimatedTitle text="Grow Faster" />
            </h3>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: '#e0d4f7' }}
                  >
                    <Check size={16} style={{ color: '#411c78' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1" style={{ color: '#411c78' }}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">Success!</DialogTitle>
              <DialogDescription className="text-center text-base pt-2">
                Account created successfully. Please check your email to verify your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button
                onClick={() => {
                  setShowSuccessDialog(false);
                  switchMode('login');
                }}
                className="w-full sm:w-auto"
                style={{ backgroundColor: '#ff5722', color: 'white' }}
              >
                Great!
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Error Dialog */}
        <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl">Error</DialogTitle>
              <DialogDescription className="text-center text-base pt-2">
                {errorMessage}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center gap-2">
              {errorMessage?.includes("haven't created an account") ? (
                <Button
                  onClick={() => {
                    setShowErrorDialog(false);
                    switchMode('signup');
                  }}
                  className="w-full sm:w-auto"
                  style={{ backgroundColor: '#6366f1', color: 'white' }}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  onClick={handleResendVerification}
                  disabled={resendingEmail}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  {resendingEmail ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Resend Verification Email'
                  )}
                </Button>
              )}
              <Button
                onClick={() => setShowErrorDialog(false)}
                className="w-full sm:w-auto"
                style={{ backgroundColor: '#ff5722', color: 'white' }}
              >
                Got it
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AccessPage;
