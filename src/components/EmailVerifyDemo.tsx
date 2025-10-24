import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface EmailData {
  id: number;
  email: string;
  status: 'pending' | 'verifying' | 'valid' | 'invalid';
}

interface EmailRowProps {
  email: EmailData;
  triggerVerify: boolean;
  shouldReset: boolean;
  isValid: boolean;
}

const EmailRow = ({ email, triggerVerify, shouldReset, isValid }: EmailRowProps) => {
  const [status, setStatus] = useState<'pending' | 'verifying' | 'valid' | 'invalid'>('pending');
  const timerRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (shouldReset) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setStatus('pending');
    }
  }, [shouldReset]);

  useEffect(() => {
    if (triggerVerify && status === 'pending') {
      setStatus('verifying');
      timerRef.current = setTimeout(() => {
        setStatus(isValid ? 'valid' : 'invalid');
      }, 1200);
    }
  }, [triggerVerify, isValid]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-[2fr_1fr] gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/60 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Email Address */}
      <div className="flex items-center gap-3 relative z-10">
        <Mail className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
          status === 'valid' ? 'text-green-600' :
          status === 'invalid' ? 'text-red-600' :
          status === 'verifying' ? 'text-blue-600' :
          'text-gray-400'
        }`} />
        <span className="text-sm font-medium text-gray-800 truncate">
          {email.email}
        </span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {status === 'pending' && (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-2 bg-gray-100 rounded-lg"
            >
              <span className="text-xs font-semibold text-gray-500">Not Verified</span>
            </motion.div>
          )}

          {status === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border border-blue-300"
            >
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                Verifying...
              </span>
            </motion.div>
          )}

          {status === 'valid' && (
            <motion.div
              key="valid"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-400 shadow-lg relative"
            >
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-xs font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                Valid
              </span>
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-300/30 rounded-full blur-xl" />
            </motion.div>
          )}

          {status === 'invalid' && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg border-2 border-red-400 shadow-lg relative"
            >
              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="text-xs font-bold bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
                Invalid
              </span>
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-300/30 rounded-full blur-xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const EmailVerifyDemo = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1);
  const [shouldReset, setShouldReset] = useState(false);

  const mockEmails: (EmailData & { isValid: boolean })[] = [
    {
      id: 1,
      email: 'john.doe@company.com',
      status: 'pending',
      isValid: true,
    },
    {
      id: 2,
      email: 'invalid@fake-domain.xyz',
      status: 'pending',
      isValid: false,
    },
    {
      id: 3,
      email: 'sarah.wilson@techcorp.io',
      status: 'pending',
      isValid: true,
    },
    {
      id: 4,
      email: 'bounced@oldcompany.com',
      status: 'pending',
      isValid: false,
    },
  ];

  useEffect(() => {
    const sequence = async () => {
      // Reset
      setShouldReset(true);
      setCurrentActiveIndex(-1);
      await new Promise((resolve) => setTimeout(resolve, 100));
      setShouldReset(false);

      // Small delay before starting
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Verify each email sequentially
      for (let i = 0; i < mockEmails.length; i++) {
        setCurrentActiveIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 1800));
      }

      // Wait before restarting
      await new Promise((resolve) => setTimeout(resolve, 1500));
    };

    const timer = setTimeout(sequence, 300);
    const interval = setInterval(sequence, 9000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/60 p-6"
      >
        {/* Title */}
        <div className="mb-5 text-center">
          <h3 className="text-base font-bold bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent">
            Email Verification Dashboard
          </h3>
        </div>

        {/* Email Rows */}
        <div className="space-y-3">
          {mockEmails.map((email, index) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EmailRow
                email={email}
                triggerVerify={currentActiveIndex === index}
                shouldReset={shouldReset}
                isValid={email.isValid}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerifyDemo;
