import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Check } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedTitle from '@/components/AnimatedTitle';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

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

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup' && !agreeToTerms) {
      toast.error('Please agree to the Terms and Conditions');
      return;
    }

    setLoading(true);

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
          toast.success('Account created successfully!');
          // Clear form data immediately after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
          setAgreeToTerms(false);
          // Navigation will happen automatically via useEffect when user state updates
        } else {
          toast.error(result.message || 'Signup failed. Please try again.');
        }
      } else {
        const result = await authLogin(formData.email, formData.password);

        if (result.success) {
          toast.success('Logged in successfully!');
          // Clear form data immediately after successful submission
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
          // Navigation will happen automatically via useEffect when user state updates
        } else {
          toast.error(result.message || 'Invalid email or password.');
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
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Signup with personal and business email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
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
                {loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
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
      </div>
    </>
  );
};

export default AccessPage;
