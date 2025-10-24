import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface Contact {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  email: string;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'Jeff Lookabaugh',
    role: 'Realtor®/Owner',
    company: 'Cinco Ranch Realty Group, L.L.C.',
    location: 'Katy, Texas',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
    email: 'jeff@cincoranch.com'
  },
  {
    id: 2,
    name: 'Teddy Burriss',
    role: 'Sales Consultant',
    company: 'Burriss Consulting, Inc.',
    location: 'Greensboro, NC',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces',
    email: 'teddy@burriss.com'
  },
  {
    id: 3,
    name: 'Kyle Warren',
    role: 'Business Owner',
    company: 'The Warren Group',
    location: 'Tulsa, Oklahoma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    email: 'kyle@warrengroup.com'
  },
  {
    id: 4,
    name: 'Dr. Jason Stanford',
    role: 'Chief Executive Officer',
    company: 'Alliance International Medical',
    location: 'Hattiesburg, MS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    email: 'jason@aimedicine.com'
  }
];

const ContactCard = ({ contact, triggerFind, shouldReset }: { contact: Contact; triggerFind: boolean; shouldReset: boolean }) => {
  const [status, setStatus] = useState<'idle' | 'finding' | 'found'>('idle');

  useEffect(() => {
    if (shouldReset) {
      setStatus('idle');
    }
  }, [shouldReset]);

  useEffect(() => {
    if (triggerFind && status === 'idle') {
      setStatus('finding');
      setTimeout(() => {
        setStatus('found');
      }, 1500);
    }
  }, [triggerFind, status]);

  const handleFindEmail = () => {
    if (status === 'idle') {
      setStatus('finding');
      setTimeout(() => {
        setStatus('found');
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-400 relative overflow-hidden"
      style={{
        transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0077B5] via-[#00A0DC] to-[#0077B5]" />
      
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg flex-shrink-0 ring-2 ring-blue-100">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          </div>
          {status === 'found' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base truncate mb-1">
            {contact.name}
          </h3>
          <p className="text-sm text-gray-600 truncate font-medium">{contact.role}</p>
          <p className="text-sm text-gray-500 truncate">{contact.company}</p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <span>📍</span> {contact.location}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleFindEmail}
                className="w-full bg-gradient-to-r from-[#0077B5] to-[#00A0DC] text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                size="sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Find Email
              </Button>
            </motion.div>
          )}

          {status === 'finding' && (
            <motion.div
              key="finding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 shadow-sm"
            >
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-700 font-semibold">
                Finding email...
              </span>
            </motion.div>
          )}

          {status === 'found' && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-3"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-xl border-2 border-green-200 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wide">Verified</span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-green-900 truncate">
                    {contact.email}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ContactRowDemo = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    const runSequence = async () => {
      // Initial delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Loop through each contact one by one
      for (let i = 0; i < mockContacts.length; i++) {
        setCurrentActiveIndex(i);
        await new Promise(resolve => setTimeout(resolve, 2800)); // Wait for full animation
      }
      
      // Hold the completed state for a moment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset all cards
      setShouldReset(true);
      setCurrentActiveIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 100));
      setShouldReset(false);
      
      // Wait before starting next cycle
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const executeLoop = async () => {
      while (true) {
        await runSequence();
      }
    };

    executeLoop();

    return () => {
      // Cleanup handled by component unmount
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {mockContacts.map((contact, index) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
          triggerFind={currentActiveIndex === index}
          shouldReset={shouldReset}
        />
      ))}
    </div>
  );
};

export default ContactRowDemo;
