import React, { useState } from 'react';
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
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jeff',
    email: 'jeff@cincoranch.com'
  },
  {
    id: 2,
    name: 'Teddy Burriss',
    role: 'Sales Consultant',
    company: 'Burriss Consulting, Inc.',
    location: 'Greensboro, NC',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teddy',
    email: 'teddy@burriss.com'
  },
  {
    id: 3,
    name: 'Kyle Warren',
    role: 'Business Owner',
    company: 'The Warren Group',
    location: 'Tulsa, Oklahoma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kyle',
    email: 'kyle@warrengroup.com'
  },
  {
    id: 4,
    name: 'Dr. Jason Stanford',
    role: 'Chief Executive Officer',
    company: 'Alliance International Medical',
    location: 'Hattiesburg, MS',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jason',
    email: 'jason@aimedicine.com'
  }
];

const ContactCard = ({ contact }: { contact: Contact }) => {
  const [status, setStatus] = useState<'idle' | 'finding' | 'found'>('idle');

  const handleFindEmail = () => {
    setStatus('finding');
    setTimeout(() => {
      setStatus('found');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-400"
      style={{
        transition: 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 flex-shrink-0">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">
            {contact.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">{contact.role}</p>
          <p className="text-sm text-gray-500 truncate">{contact.company}</p>
          <p className="text-xs text-gray-400 mt-1">{contact.location}</p>
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
                className="w-full bg-gradient-to-r from-[#0077B5] to-[#00A0DC] text-white hover:shadow-lg"
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
              className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-sm text-blue-700 font-medium">
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
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Email found!</span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
              >
                <p className="text-sm font-mono text-green-800 truncate">
                  {contact.email}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ContactRowDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactRowDemo;
