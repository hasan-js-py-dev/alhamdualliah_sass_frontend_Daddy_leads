import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from './components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BuyCreditsPage = () => {
  const [leadsQuantity, setLeadsQuantity] = useState<number>(10000);
  const [dataQuantity, setDataQuantity] = useState<number>(10000);
  const [leadsError, setLeadsError] = useState<string>('');
  const [dataError, setDataError] = useState<string>('');

  const leadsPrice = 0.0019; // $19 per 10,000 leads
  const dataPrice = 0.0009; // $9 per 10,000 credits
  const minQuantity = 10000;

  const leadsFeatures = [
    'LinkedIn Sales Nav Scraper',
    'Email Enricher',
    'Domain Enricher',
    'LinkedIn Profile Scraper',
    'Apollo Scraper',
    'Zoominfo Scraper',
    'Crunchbase Scraper',
    'Lemlist Scraper'
  ];

  const dataFeatures = [
    'Email Verifier',
    'LinkedIn Sales Nav Company Scraper',
    'Yelp Scraper',
    'Google Map Scraper',
    'Restaurant Directories',
    'RealEstate Directories',
    'Scrape Companies from b2b Databases'
  ];

  const handleLeadsChange = (value: string) => {
    const num = Number(value);
    if (num < minQuantity) {
      setLeadsError(`Minimum purchase is ${minQuantity.toLocaleString()} credits`);
      setLeadsQuantity(num);
    } else {
      setLeadsError('');
      setLeadsQuantity(num);
    }
  };

  const handleDataChange = (value: string) => {
    const num = Number(value);
    if (num < minQuantity) {
      setDataError(`Minimum purchase is ${minQuantity.toLocaleString()} credits`);
      setDataQuantity(num);
    } else {
      setDataError('');
      setDataQuantity(num);
    }
  };

  const handleLeadsPurchase = () => {
    if (leadsQuantity < minQuantity) {
      setLeadsError(`Minimum purchase is ${minQuantity.toLocaleString()} credits`);
      return;
    }
    // Payment gateway integration will go here
    console.log('Processing leads purchase:', leadsQuantity);
  };

  const handleDataPurchase = () => {
    if (dataQuantity < minQuantity) {
      setDataError(`Minimum purchase is ${minQuantity.toLocaleString()} credits`);
      return;
    }
    // Payment gateway integration will go here
    console.log('Processing data purchase:', dataQuantity);
  };

  return (
    <>
      <Helmet>
        <title>Buy Credits - Daddy Leads</title>
        <meta name="description" content="Purchase credits for B2B lead generation and data scraping." />
      </Helmet>

      <DashboardLayout>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#411c78' }}>
              Buy Credits
            </h1>
            <p className="text-lg text-gray-700">
              Choose your plan and purchase credits for your lead generation needs
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* B2B Leads Finder Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-2 hover:shadow-xl transition-shadow" style={{ borderColor: '#411c78' }}>
                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: '#411c78' }}>B2B LEADS FINDER</CardTitle>
                  <CardDescription className="text-lg font-semibold text-gray-700">
                    $0.0019 per lead • Min. purchase $19 (10,000 credits)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Calculator */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Number of credits:</label>
                    <Input
                      type="number"
                      min={minQuantity}
                      step="1000"
                      value={leadsQuantity}
                      onChange={(e) => handleLeadsChange(e.target.value)}
                      className={`text-lg ${leadsError ? 'border-red-500' : ''}`}
                    />
                    {leadsError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{leadsError}</span>
                      </div>
                    )}
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#411c78' }}>
                      <p className="text-white text-center text-2xl font-bold">
                        ${(leadsQuantity * leadsPrice).toFixed(2)}
                      </p>
                      <p className="text-white/80 text-center text-sm">Total Cost</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="font-semibold text-gray-700">Included Scrapers:</p>
                    {leadsFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#411c78' }} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Note:</span> Credits charged only for valid emails (not catchall or invalid).
                    </p>
                  </div>

                  <Button 
                    onClick={handleLeadsPurchase}
                    disabled={leadsQuantity < minQuantity}
                    className="w-full" 
                    style={{ backgroundColor: '#411c78' }}
                  >
                    Buy Credits
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* B2B Data Scraper Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full border-2 hover:shadow-xl transition-shadow" style={{ borderColor: '#411c78' }}>
                <CardHeader>
                  <CardTitle className="text-2xl" style={{ color: '#411c78' }}>B2B DATA SCRAPER</CardTitle>
                  <CardDescription className="text-lg font-semibold text-gray-700">
                    $0.0009 per credit • Min. purchase $9 (10,000 credits)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Calculator */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Number of credits:</label>
                    <Input
                      type="number"
                      min={minQuantity}
                      step="1000"
                      value={dataQuantity}
                      onChange={(e) => handleDataChange(e.target.value)}
                      className={`text-lg ${dataError ? 'border-red-500' : ''}`}
                    />
                    {dataError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{dataError}</span>
                      </div>
                    )}
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#411c78' }}>
                      <p className="text-white text-center text-2xl font-bold">
                        ${(dataQuantity * dataPrice).toFixed(2)}
                      </p>
                      <p className="text-white/80 text-center text-sm">Total Cost</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <p className="font-semibold text-gray-700">Included Scrapers:</p>
                    {dataFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#411c78' }} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Note:</span> Credits charged only for successful rows.
                    </p>
                  </div>

                  <Button 
                    onClick={handleDataPurchase}
                    disabled={dataQuantity < minQuantity}
                    className="w-full" 
                    style={{ backgroundColor: '#411c78' }}
                  >
                    Buy Credits
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default BuyCreditsPage;
