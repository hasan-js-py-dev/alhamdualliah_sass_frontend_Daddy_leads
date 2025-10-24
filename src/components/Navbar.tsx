import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const Navbar = () => {
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
            className="animate-shake bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent font-bold text-[22px] tracking-tight"
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
                className="text-[15px] font-semibold text-gray-800 hover:text-gray-900 hover:scale-105 transition-all duration-300"
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
                className="inline-flex items-center justify-center text-[16px] px-4 md:px-5 py-2 md:py-2.5 rounded-xl min-h-[40px] border-gray-700 text-gray-800 hover:bg-gray-100"
              >
                LOGIN
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="inline-flex items-center justify-center text-[16px] px-4 md:px-5 py-2 md:py-2.5 rounded-xl min-h-[40px] bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] text-white hover:shadow-lg hover:scale-[1.03] transition-all duration-250 ease-in-out font-semibold">
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
