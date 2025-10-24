import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage = ({ title }: ComingSoonPageProps) => {
  return (
    <>
      <Helmet>
        <title>{`${title} — Daddy Leads`}</title>
        <meta name="description" content={`${title} page coming soon.`} />
      </Helmet>
      <div className="min-h-screen bg-[#0f0f10] relative overflow-hidden">
        <Navbar />
        <div className="flex items-center justify-center pt-40 px-6">
          <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            <p className="text-white/80 mb-4">Coming Soon</p>
            <p className="text-white/70 mb-8">
              We're working hard to bring you this page. Please check back
              later.
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-[#7C3AED] to-[#C026D3] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
