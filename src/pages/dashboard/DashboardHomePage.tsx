import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Mail, Globe, UserCircle, Database, CheckCircle, Building2, MapPin, Phone, FileSpreadsheet, Home, DollarSign, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const leadFinderProducts = [
  {
    name: 'LinkedIn Sales Nav Scraper',
    description: 'Extract leads from LinkedIn Sales Navigator with advanced filters and export options.',
    icon: Zap,
    iconBg: 'from-blue-500 to-blue-700',
    path: '/dashboard/linkedin-sales-nav-scraper',
  },
  {
    name: 'Email Enricher',
    description: 'Find and verify email addresses for your prospects with high accuracy rates.',
    icon: Mail,
    iconBg: 'from-purple-500 to-purple-700',
    path: '/dashboard/email-enricher',
  },
  {
    name: 'Domain Enricher',
    description: 'Discover company information and employee data from domain names.',
    icon: Globe,
    iconBg: 'from-green-500 to-green-700',
    path: '/dashboard/domain-enricher',
  },
  {
    name: 'Bulk LinkedIn Profile Enricher',
    description: 'Enrich multiple LinkedIn profiles with detailed information in bulk.',
    icon: UserCircle,
    iconBg: 'from-orange-500 to-orange-700',
    path: '/dashboard/bulk-linkedin-profile-enricher',
  },
  {
    name: 'Apollo Scraper',
    description: 'Scrape and enrich B2B contact data from Apollo.io platform.',
    icon: Database,
    iconBg: 'from-pink-500 to-pink-700',
    path: '/dashboard/apollo-scraper',
  },
  {
    name: 'Zoominfo Scraper',
    description: 'Extract B2B data from Zoominfo platform.',
    icon: Building2,
    iconBg: 'from-cyan-500 to-cyan-700',
    path: '/dashboard/zoominfo-scraper',
  },
  {
    name: 'Crunchbase Scraper',
    description: 'Scrape company and funding data from Crunchbase.',
    icon: DollarSign,
    iconBg: 'from-emerald-500 to-emerald-700',
    path: '/dashboard/crunchbase-scraper',
  },
  {
    name: 'Lemlist Scraper',
    description: 'Extract campaign and lead data from Lemlist.',
    icon: Mail,
    iconBg: 'from-indigo-500 to-indigo-700',
    path: '/dashboard/lemlist-scraper',
  },
];

const dataScraperProducts = [
  {
    name: 'Email Verifier',
    description: 'Verify email addresses for deliverability and validity.',
    icon: CheckCircle,
    iconBg: 'from-green-500 to-green-700',
    path: '/dashboard/email-verifier',
  },
  {
    name: 'LinkedIn Sales Nav Company Scraper',
    description: 'Extract company data from LinkedIn Sales Navigator.',
    icon: Building2,
    iconBg: 'from-blue-500 to-blue-700',
    path: '/dashboard/linkedin-company-scraper',
  },
  {
    name: 'Yelp Scraper',
    description: 'Extract business listings and reviews from Yelp.',
    icon: Phone,
    iconBg: 'from-orange-500 to-orange-700',
    path: '/dashboard/yelp-scraper',
  },
  {
    name: 'Google Map Scraper',
    description: 'Scrape business data from Google Maps.',
    icon: MapPin,
    iconBg: 'from-red-500 to-red-700',
    path: '/dashboard/google-map-scraper',
  },
  {
    name: 'Restaurant Directories',
    description: 'Scrape restaurant data from various directories.',
    icon: Utensils,
    iconBg: 'from-yellow-500 to-yellow-700',
    path: '/dashboard/restaurant-directories',
  },
  {
    name: 'RealEstate Directories',
    description: 'Extract property listings from real estate directories.',
    icon: Home,
    iconBg: 'from-purple-500 to-purple-700',
    path: '/dashboard/realestate-directories',
  },
  {
    name: 'Scrape Companies from B2B Databases',
    description: 'Extract company data from various B2B databases.',
    icon: FileSpreadsheet,
    iconBg: 'from-teal-500 to-teal-700',
    path: '/dashboard/b2b-databases',
  },
];

export default function DashboardHomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Dashboard - Daddy Leads</title>
        <meta name="description" content="Access your B2B lead generation tools and manage your campaigns." />
      </Helmet>

      <DashboardLayout>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Centered Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Daddy Leads</h1>
            <p className="text-gray-600">Choose a tool to get started with your lead generation</p>
          </div>

          {/* B2B Lead Finder Section */}
          <div className="mb-12">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900">B2B Lead Finder</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {leadFinderProducts.map((product, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border-gray-200 hover:scale-105 w-full max-w-sm"
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.iconBg} flex items-center justify-center mb-4 shadow-md`}
                    >
                      <product.icon className="text-white" size={28} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4">
                      {product.description}
                    </CardDescription>
                    <Button 
                      onClick={() => navigate(product.path)}
                      className="w-full bg-[#6b46c1] hover:bg-[#5a3aa3] text-white"
                    >
                      Run
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Scraper Section */}
          <div className="mb-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900">Data Scraper</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {dataScraperProducts.map((product, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border-gray-200 hover:scale-105 w-full max-w-sm"
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.iconBg} flex items-center justify-center mb-4 shadow-md`}
                    >
                      <product.icon className="text-white" size={28} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4">
                      {product.description}
                    </CardDescription>
                    <Button 
                      onClick={() => navigate(product.path)}
                      className="w-full bg-[#6b46c1] hover:bg-[#5a3aa3] text-white"
                    >
                      Run
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
