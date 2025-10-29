import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from './components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Mail, Globe, UserCircle, Database } from 'lucide-react';

const products = [
  {
    name: 'LinkedIn Sales Nav Scraper',
    description: 'Extract leads from LinkedIn Sales Navigator with advanced filters and export options.',
    icon: Zap,
    gradient: 'from-blue-400 to-blue-600',
    iconBg: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Email Enricher',
    description: 'Find and verify email addresses for your prospects with high accuracy rates.',
    icon: Mail,
    gradient: 'from-purple-400 to-purple-600',
    iconBg: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Domain Enricher',
    description: 'Discover company information and employee data from domain names.',
    icon: Globe,
    gradient: 'from-green-400 to-green-600',
    iconBg: 'from-green-500 to-green-700',
  },
  {
    name: 'LinkedIn Profile Scraper',
    description: 'Extract detailed information from LinkedIn profiles including work history and skills.',
    icon: UserCircle,
    gradient: 'from-orange-400 to-orange-600',
    iconBg: 'from-orange-500 to-orange-700',
  },
  {
    name: 'Apollo Scraper',
    description: 'Scrape and enrich B2B contact data from Apollo.io platform.',
    icon: Database,
    gradient: 'from-pink-400 to-pink-600',
    iconBg: 'from-pink-500 to-pink-700',
  },
];

export default function DashboardHomePage() {
  return (
    <>
      <Helmet>
        <title>Dashboard - Daddy Leads</title>
        <meta name="description" content="Access your B2B lead generation tools and manage your campaigns." />
      </Helmet>

      <DashboardLayout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Daddy Leads</h1>
            <p className="text-gray-600">Choose a tool to get started with your lead generation</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:scale-105"
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
