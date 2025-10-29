import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from './components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Mail, Globe, UserCircle, Database, Menu, X, CheckCircle, Building2, MapPin, Phone, FileSpreadsheet, Home, DollarSign, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const leadFinderProducts = [
  {
    name: 'LinkedIn Sales Nav Scraper',
    description: 'Extract leads from LinkedIn Sales Navigator with advanced filters and export options.',
    icon: Zap,
    iconBg: 'from-blue-500 to-blue-700',
    isDefault: true,
  },
  {
    name: 'Bulk LinkedIn Profile Enricher',
    description: 'Enrich multiple LinkedIn profiles with detailed information in bulk.',
    icon: UserCircle,
    iconBg: 'from-orange-500 to-orange-700',
    isDefault: true,
  },
  {
    name: 'Apollo Scraper',
    description: 'Scrape and enrich B2B contact data from Apollo.io platform.',
    icon: Database,
    iconBg: 'from-pink-500 to-pink-700',
    isDefault: true,
  },
  {
    name: 'Email Enricher',
    description: 'Find and verify email addresses for your prospects with high accuracy rates.',
    icon: Mail,
    iconBg: 'from-purple-500 to-purple-700',
    isDefault: false,
  },
  {
    name: 'Domain Enricher',
    description: 'Discover company information and employee data from domain names.',
    icon: Globe,
    iconBg: 'from-green-500 to-green-700',
    isDefault: false,
  },
  {
    name: 'Zoominfo Scraper',
    description: 'Extract B2B data from Zoominfo platform.',
    icon: Building2,
    iconBg: 'from-cyan-500 to-cyan-700',
    isDefault: false,
  },
  {
    name: 'Crunchbase Scraper',
    description: 'Scrape company and funding data from Crunchbase.',
    icon: DollarSign,
    iconBg: 'from-emerald-500 to-emerald-700',
    isDefault: false,
  },
  {
    name: 'Lemlist Scraper',
    description: 'Extract campaign and lead data from Lemlist.',
    icon: Mail,
    iconBg: 'from-indigo-500 to-indigo-700',
    isDefault: false,
  },
];

const dataScraperProducts = [
  {
    name: 'Email Verifier',
    description: 'Verify email addresses for deliverability and validity.',
    icon: CheckCircle,
    iconBg: 'from-green-500 to-green-700',
    isDefault: true,
  },
  {
    name: 'LinkedIn Sales Nav Company Scraper',
    description: 'Extract company data from LinkedIn Sales Navigator.',
    icon: Building2,
    iconBg: 'from-blue-500 to-blue-700',
    isDefault: true,
  },
  {
    name: 'Google Map Scraper',
    description: 'Scrape business data from Google Maps.',
    icon: MapPin,
    iconBg: 'from-red-500 to-red-700',
    isDefault: true,
  },
  {
    name: 'Yelp Scraper',
    description: 'Extract business listings and reviews from Yelp.',
    icon: Phone,
    iconBg: 'from-orange-500 to-orange-700',
    isDefault: false,
  },
  {
    name: 'Restaurant Directories',
    description: 'Scrape restaurant data from various directories.',
    icon: Utensils,
    iconBg: 'from-yellow-500 to-yellow-700',
    isDefault: false,
  },
  {
    name: 'RealEstate Directories',
    description: 'Extract property listings from real estate directories.',
    icon: Home,
    iconBg: 'from-purple-500 to-purple-700',
    isDefault: false,
  },
  {
    name: 'Scrape Companies from B2B Databases',
    description: 'Extract company data from various B2B databases.',
    icon: FileSpreadsheet,
    iconBg: 'from-teal-500 to-teal-700',
    isDefault: false,
  },
];

export default function DashboardHomePage() {
  const [showAllLeadFinder, setShowAllLeadFinder] = useState(false);
  const [showAllDataScraper, setShowAllDataScraper] = useState(false);

  const displayedLeadFinder = showAllLeadFinder 
    ? leadFinderProducts 
    : leadFinderProducts.filter(p => p.isDefault);
    
  const displayedDataScraper = showAllDataScraper 
    ? dataScraperProducts 
    : dataScraperProducts.filter(p => p.isDefault);

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
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">B2B Lead Finder</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllLeadFinder(!showAllLeadFinder)}
                className="gap-2"
              >
                {showAllLeadFinder ? (
                  <>
                    <X className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Menu className="w-4 h-4" />
                    Show All
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {displayedLeadFinder.map((product, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:scale-105 w-full max-w-sm"
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
                    <CardDescription className="text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Data Scraper Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Data Scraper</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllDataScraper(!showAllDataScraper)}
                className="gap-2"
              >
                {showAllDataScraper ? (
                  <>
                    <X className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <Menu className="w-4 h-4" />
                    Show All
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {displayedDataScraper.map((product, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:scale-105 w-full max-w-sm"
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
                    <CardDescription className="text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </CardDescription>
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
