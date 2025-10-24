import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PRODUCT', path: '/product' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'CONNECT', path: '/connect' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-12 left-0 right-0 z-50 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto bg-transparent backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div
            className={`animate-shake font-bold text-[22px] tracking-tight transition-all duration-500 ${
              isScrolled
                ? 'bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-[#FFF5E6] via-[#FFE5D9] to-[#FFD4C4] bg-clip-text text-transparent'
            }`}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
            }}
            style={{ willChange: 'transform, background-position' }}
          >
            DL
          </motion.div>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] font-semibold hover:scale-105 transition-all duration-500 ${
                  isScrolled
                    ? 'text-gray-800 hover:text-gray-900'
                    : 'text-[#FFF5E6] hover:text-white'
                }`}
                style={{
                  transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
                  willChange: 'transform',
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className={`inline-flex items-center justify-center text-[16px] px-4 md:px-5 py-2 md:py-2.5 rounded-xl min-h-[40px] transition-all duration-500 ${
                  isScrolled
                    ? 'border-gray-700 text-gray-800 hover:bg-gray-100'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                LOGIN
              </Button>
            </Link>
            <Link to="/signup">
              <Button className={`inline-flex items-center justify-center text-[16px] px-4 md:px-5 py-2 md:py-2.5 rounded-xl min-h-[40px] hover:shadow-lg hover:scale-[1.03] transition-all duration-500 ease-in-out font-semibold ${
                isScrolled
                  ? 'bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] text-white'
                  : 'bg-white text-[#7C3AED] hover:bg-white/90'
              }`}>
                SIGNUP
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
