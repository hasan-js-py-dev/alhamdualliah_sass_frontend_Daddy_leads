import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Loader2, CheckCircle, FileSpreadsheet } from 'lucide-react';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  domain: string;
  email: string;
}

const mockCSVContacts: Contact[] = [
  {
    id: 1,
    first_name: 'Sarah',
    last_name: 'Johnson',
    domain: 'techcorp.com',
    email: 'sarah.johnson@techcorp.com'
  },
  {
    id: 2,
    first_name: 'Michael',
    last_name: 'Chen',
    domain: 'innovate.io',
    email: 'michael.chen@innovate.io'
  },
  {
    id: 3,
    first_name: 'Emma',
    last_name: 'Williams',
    domain: 'digitalhub.net',
    email: 'emma.williams@digitalhub.net'
  },
  {
    id: 4,
    first_name: 'James',
    last_name: 'Martinez',
    domain: 'ventures.co',
    email: 'james.martinez@ventures.co'
  }
];

const CSVRow = ({ contact, triggerFind, shouldReset }: { contact: Contact; triggerFind: boolean; shouldReset: boolean }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="grid grid-cols-[1fr_1fr_1.2fr_2fr] gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:shadow-md transition-all duration-300 items-center"
    >
      <div className="text-sm font-medium text-gray-800 truncate">
        {contact.first_name}
      </div>
      <div className="text-sm font-medium text-gray-800 truncate">
        {contact.last_name}
      </div>
      <div className="text-sm text-gray-600 truncate font-mono">
        {contact.domain}
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              <Mail className="w-4 h-4" />
              <span className="text-xs">Waiting...</span>
            </motion.div>
          )}

          {status === 'finding' && (
            <motion.div
              key="finding"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 py-2 px-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
            >
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs text-blue-700 font-medium">Finding...</span>
            </motion.div>
          )}

          {status === 'found' && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex items-center gap-2 py-2 px-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-300 relative overflow-hidden"
            >
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-xs font-mono font-semibold text-green-900 truncate">
                {contact.email}
              </span>
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/30 rounded-full blur-xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CSVEnrichDemo = () => {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    const runSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      for (let i = 0; i < mockCSVContacts.length; i++) {
        setCurrentActiveIndex(i);
        await new Promise(resolve => setTimeout(resolve, 2800));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShouldReset(true);
      setCurrentActiveIndex(-1);
      await new Promise(resolve => setTimeout(resolve, 100));
      setShouldReset(false);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const executeLoop = async () => {
      while (true) {
        await runSequence();
      }
    };

    executeLoop();

    return () => {};
  }, []);

  return (
    <div className="space-y-4">
      {/* CSV Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] rounded-t-xl p-4 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-3">
          <FileSpreadsheet className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold text-sm">contacts_enrichment.csv</h3>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1.2fr_2fr] gap-3 text-xs font-bold text-white/90 uppercase tracking-wide">
          <div>First Name</div>
          <div>Last Name</div>
          <div>Domain</div>
          <div>Email</div>
        </div>
      </motion.div>

      {/* CSV Rows */}
      <div className="space-y-3 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-b-xl border-x border-b border-gray-200">
        {mockCSVContacts.map((contact, index) => (
          <CSVRow
            key={contact.id}
            contact={contact}
            triggerFind={currentActiveIndex === index}
            shouldReset={shouldReset}
          />
        ))}
      </div>
    </div>
  );
};

export default CSVEnrichDemo;
