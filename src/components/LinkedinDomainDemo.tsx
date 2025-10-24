import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnrichData {
  type: 'domain' | 'linkedin';
  input: string;
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  location?: string;
}

interface EnrichRowProps {
  data: EnrichData;
  triggerEnrich: boolean;
  shouldReset: boolean;
}

const EnrichRow = ({ data, triggerEnrich, shouldReset }: EnrichRowProps) => {
  const [enriching, setEnriching] = useState(false);
  const [enriched, setEnriched] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (shouldReset) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setEnriching(false);
      setEnriched(false);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (triggerEnrich && !enriching && !enriched) {
      setEnriching(true);
      timerRef.current = setTimeout(() => {
        setEnriching(false);
        setEnriched(true);
      }, 1000);
    }
  }, [triggerEnrich]);

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
      className="grid grid-cols-6 gap-2 py-2.5 px-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40 shadow-sm"
    >
      {/* Input Column (Domain or LinkedIn) */}
      <div className="col-span-1 flex items-center">
        <span className="text-[11px] font-semibold bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent truncate">
          {data.input}
        </span>
      </div>

      {/* Name */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-name"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent"
            >
              {data.name}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Title */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-700 truncate"
            >
              {data.title}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Company */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-company"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-company"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-700 truncate"
            >
              {data.company}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-email"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs bg-gradient-to-r from-[#14F195] via-[#00D4FF] to-[#9945FF] bg-clip-text text-transparent animate-shimmer truncate"
              style={{ backgroundSize: '200% 100%' }}
            >
              {data.email}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>

      {/* Location */}
      <div className="col-span-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {enriching ? (
            <motion.div
              key="finding-location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1"
            >
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 italic">finding...</span>
            </motion.div>
          ) : enriched ? (
            <motion.span
              key="found-location"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-gray-700 truncate"
            >
              {data.location}
            </motion.span>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LinkedinDomainDemo = () => {
  const [currentMode, setCurrentMode] = useState<'domain' | 'linkedin'>('domain');
  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1);
  const [shouldReset, setShouldReset] = useState(false);

  const mockData: Record<'domain' | 'linkedin', EnrichData[]> = {
    domain: [
      {
        type: 'domain',
        input: 'acme.com',
        name: 'John Smith',
        title: 'CEO',
        company: 'Acme Corp',
        email: 'john@acme.com',
        location: 'San Francisco',
      },
      {
        type: 'domain',
        input: 'techco.io',
        name: 'Emily Davis',
        title: 'CTO',
        company: 'TechCo',
        email: 'emily@techco.io',
        location: 'Austin',
      },
      {
        type: 'domain',
        input: 'innovate.ai',
        name: 'Michael Chen',
        title: 'Founder',
        company: 'Innovate AI',
        email: 'michael@innovate.ai',
        location: 'Seattle',
      },
      {
        type: 'domain',
        input: 'salesforce.com',
        name: 'Jessica Brown',
        title: 'VP Marketing',
        company: 'Salesforce',
        email: 'jess@salesforce.com',
        location: 'San Francisco',
      },
    ],
    linkedin: [
      {
        type: 'linkedin',
        input: 'linkedin.com/in/sarah-j',
        name: 'Sarah Johnson',
        title: 'VP Sales',
        company: 'TechStart Inc',
        email: 'sarah@techstart.com',
        location: 'New York',
      },
      {
        type: 'linkedin',
        input: 'linkedin.com/in/alex-k',
        name: 'Alex Kumar',
        title: 'Product Lead',
        company: 'CloudBase',
        email: 'alex@cloudbase.io',
        location: 'Boston',
      },
      {
        type: 'linkedin',
        input: 'linkedin.com/in/maria-g',
        name: 'Maria Garcia',
        title: 'Head of Ops',
        company: 'DataFlow',
        email: 'maria@dataflow.com',
        location: 'Chicago',
      },
      {
        type: 'linkedin',
        input: 'linkedin.com/in/david-w',
        name: 'David Wilson',
        title: 'Engineering Dir',
        company: 'DevTools',
        email: 'david@devtools.ai',
        location: 'Denver',
      },
    ],
  };

  useEffect(() => {
    const sequence = async () => {
      // Reset all rows
      setShouldReset(true);
      setCurrentActiveIndex(-1);
      await new Promise((resolve) => setTimeout(resolve, 100));
      setShouldReset(false);

      // Small delay before starting
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Enrich each row sequentially with smooth timing
      for (let i = 0; i < 4; i++) {
        setCurrentActiveIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 1600));
      }

      // Wait before switching mode
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Switch mode
      setCurrentMode((prev) => (prev === 'domain' ? 'linkedin' : 'domain'));
    };

    // Start the sequence
    const timer = setTimeout(sequence, 300);
    const interval = setInterval(sequence, 8000);

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
        {/* CSV Title centered */}
        <div className="mb-5 text-center">
          <h3 className="text-base font-bold bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
            {currentMode === 'domain' ? 'Domain Enrichment' : 'LinkedIn Profile Enrichment'}
          </h3>
        </div>

        {/* CSV Header */}
        <div className="grid grid-cols-6 gap-3 mb-3 px-4 py-2.5 bg-gradient-to-r from-[#FF6B35]/10 via-[#FF8C42]/10 to-[#FFA07A]/10 rounded-xl border border-[#FF6B35]/20">
          <div className="col-span-1 text-xs font-bold bg-gradient-to-r from-[#FF6B35] to-[#FFA07A] bg-clip-text text-transparent">
            {currentMode === 'domain' ? 'Domain' : 'LinkedIn'}
          </div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Name</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Title</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Company</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Email</div>
          <div className="col-span-1 text-xs font-bold text-gray-700 text-center">Location</div>
        </div>

        {/* Data Rows */}
        <div className="space-y-2.5">
          {mockData[currentMode].map((data, index) => (
            <motion.div
              key={`${currentMode}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EnrichRow
                data={data}
                triggerEnrich={currentActiveIndex === index}
                shouldReset={shouldReset}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LinkedinDomainDemo;
