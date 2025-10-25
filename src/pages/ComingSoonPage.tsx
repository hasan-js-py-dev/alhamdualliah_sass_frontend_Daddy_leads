import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { DashboardLayout } from '../components/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

interface ComingSoonPageProps {
  title?: string;
}

const ComingSoonPage = ({ title = 'Feature' }: ComingSoonPageProps) => {
  return (
    <>
      <Helmet>
        <title>{`${title} — Daddy Leads Dashboard`}</title>
        <meta name="description" content={`${title} coming soon to Daddy Leads`} />
      </Helmet>

      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3ff' }}>
          <div className="text-center space-y-6 px-4">
            <h1 className="text-6xl font-bold" style={{ color: '#6366f1' }}>
              {title}
            </h1>
            <p className="text-2xl font-semibold text-gray-800">Coming Soon</p>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We're working hard to bring you this feature. Stay tuned!
            </p>
            <Button asChild size="lg" style={{ backgroundColor: '#6366f1' }}>
              <Link to="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ComingSoonPage;
