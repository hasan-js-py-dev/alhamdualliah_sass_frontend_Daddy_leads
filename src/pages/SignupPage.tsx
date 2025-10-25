import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Check } from 'lucide-react';
import AnimatedTitle from '@/components/AnimatedTitle';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToUpdates: false,
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup submitted:', formData);
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
        <title>Create Account - Daddy Leads | B2B Lead Generation Platform</title>
        <meta name="description" content="Sign up for Daddy Leads to access powerful B2B data scraping, email verification, and lead generation tools. Get started free today." />
      </Helmet>

      <div className="min-h-screen flex" style={{ backgroundColor: '#faf8f0' }}>
        {/* Left Column - Signup Form */}
        <div className="w-1/2 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <Link to="/" className="inline-block mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#14F195] via-[#00D4FF] to-[#9945FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                DL
              </div>
            </Link>

            <h1 className="text-3xl font-bold mb-8" style={{ color: '#411c78' }}>
              Create your free account
            </h1>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-6 h-12 border-2 bg-white hover:bg-gray-50"
              style={{ borderColor: '#d1d5db', color: '#1f2937' }}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" style={{ borderColor: '#d1d5db' }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#faf8f0] px-4 text-gray-500">Or use your work email</span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Work Email"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Please confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="bg-white border-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="updates"
                  checked={formData.agreeToUpdates}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeToUpdates: checked as boolean })
                  }
                />
                <label htmlFor="updates" className="text-sm text-gray-600 leading-tight cursor-pointer">
                  I agree to receive occasional news and updates.
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, acceptTerms: checked as boolean })
                  }
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-tight cursor-pointer">
                  I accept the{' '}
                  <a href="#" className="text-[#6366f1] hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#6366f1] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold mt-6"
                style={{ backgroundColor: '#6366f1', color: 'white' }}
              >
                Create Account
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-[#6366f1] hover:underline font-medium">
                  Sign in
                </Link>
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

export default SignupPage;
