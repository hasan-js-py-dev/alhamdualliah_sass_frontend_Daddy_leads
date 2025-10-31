import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Database, 
  Mail, 
  CheckCircle, 
  ChevronDown,
  CreditCard,
  LogOut,
  Download,
  Menu,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [leadFinderOpen, setLeadFinderOpen] = useState(true);
  const [dataScraperOpen, setDataScraperOpen] = useState(true);
  const [showAllLeadFinder, setShowAllLeadFinder] = useState(false);
  const [showAllDataScraper, setShowAllDataScraper] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/access?p=login');
  };

  const allLeadFinderTools = [
    { name: 'LinkedIn Sales Nav Scraper', path: '/dashboard/linkedin-sales-nav-scraper', icon: Zap, isDefault: true, gradient: 'from-blue-400 to-cyan-300' },
    { name: 'Bulk LinkedIn Profile Enricher', path: '/dashboard/bulk-linkedin-profile-enricher', icon: Database, isDefault: true, gradient: 'from-purple-400 to-pink-300' },
    { name: 'Apollo Scraper', path: '/dashboard/apollo-scraper', icon: Database, isDefault: true, gradient: 'from-orange-400 to-yellow-300' },
    { name: 'Email Enricher', path: '/dashboard/email-enricher', icon: Mail, isDefault: false, gradient: 'from-green-400 to-emerald-300' },
    { name: 'Domain Enricher', path: '/dashboard/domain-enricher', icon: Database, isDefault: false, gradient: 'from-indigo-400 to-blue-300' },
    { name: 'Zoominfo Scraper', path: '/dashboard/zoominfo-scraper', icon: Database, isDefault: false, gradient: 'from-red-400 to-orange-300' },
    { name: 'Crunchbase Scraper', path: '/dashboard/crunchbase-scraper', icon: Database, isDefault: false, gradient: 'from-teal-400 to-cyan-300' },
    { name: 'Lemlist Scraper', path: '/dashboard/lemlist-scraper', icon: Mail, isDefault: false, gradient: 'from-violet-400 to-purple-300' },
  ];

  const allDataScraperTools = [
    { name: 'Email Verifier', path: '/dashboard/email-verifier', icon: CheckCircle, isDefault: true, gradient: 'from-emerald-400 to-green-300' },
    { name: 'LinkedIn Sales Nav Company Scraper', path: '/dashboard/linkedin-company-scraper', icon: Database, isDefault: true, gradient: 'from-sky-400 to-blue-300' },
    { name: 'Google Map Scraper', path: '/dashboard/google-map-scraper', icon: Database, isDefault: true, gradient: 'from-rose-400 to-pink-300' },
    { name: 'Yelp Scraper', path: '/dashboard/yelp-scraper', icon: Database, isDefault: false, gradient: 'from-amber-400 to-orange-300' },
    { name: 'Restaurant Directories', path: '/dashboard/restaurant-directories', icon: Database, isDefault: false, gradient: 'from-fuchsia-400 to-pink-300' },
    { name: 'RealEstate Directories', path: '/dashboard/realestate-directories', icon: Database, isDefault: false, gradient: 'from-lime-400 to-green-300' },
    { name: 'Scrape Companies from B2B Databases', path: '/dashboard/b2b-databases', icon: Database, isDefault: false, gradient: 'from-cyan-400 to-teal-300' },
  ];

  const leadFinderTools = showAllLeadFinder 
    ? allLeadFinderTools 
    : allLeadFinderTools.filter(tool => tool.isDefault);

  const dataScraperTools = showAllDataScraper 
    ? allDataScraperTools 
    : allDataScraperTools.filter(tool => tool.isDefault);

  return (
    <div className="flex h-screen bg-gray-50 flex-col">
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-10">
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <span className="text-lg font-bold text-white">DL</span>
            </div>
            <span className="text-gray-900 font-bold text-lg tracking-tight">Daddy Leads</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Credits Display */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">B2B Lead:</span>
              <span className="text-sm font-bold text-orange-600 px-2 py-0.5 rounded bg-orange-50">
                {user?.credits?.leadsFinderCredits || 0}
              </span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-600">Data Scraper:</span>
              <span className="text-sm font-bold text-blue-600 px-2 py-0.5 rounded bg-blue-50">
                {user?.credits?.dataScraperCredits || 0}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <Button 
            size="sm"
            className="bg-[#ff5f38] hover:bg-[#e55532] text-white font-medium shadow-sm"
            onClick={() => navigate('/dashboard/buy-credits')}
          >
            <CreditCard className="mr-1.5" size={16} />
            Buy Credits
          </Button>

          <Button 
            size="sm"
            variant="outline"
            className="font-medium"
            onClick={() => window.open('https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm', '_blank')}
          >
            <Download className="mr-1.5" size={16} />
            Download Extension
          </Button>

          <Button 
            size="sm"
            variant="outline"
            className="font-medium"
            onClick={() => window.open('https://wa.me/your-number', '_blank')}
          >
            <MessageCircle className="mr-1.5" size={16} />
            Help
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col bg-white border-r border-gray-200 overflow-hidden">
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
            {/* B2B Lead Finder */}
            <Collapsible open={leadFinderOpen} onOpenChange={setLeadFinderOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#ff5f38] text-white transition-all duration-200 group">
                <span className="text-xs font-bold tracking-wide uppercase">B2B Lead Finder</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${leadFinderOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-0.5 mt-1">
                  {leadFinderTools.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 ml-2 rounded-lg transition-all duration-200 group whitespace-nowrap overflow-hidden ${
                          isActive
                            ? 'bg-[#ff5f38] text-white shadow-sm'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <item.icon size={16} className="flex-shrink-0" />
                        <span className="text-sm font-medium truncate">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => setShowAllLeadFinder(!showAllLeadFinder)}
                    className="flex items-center space-x-2 px-3 py-2 ml-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 w-full group whitespace-nowrap"
                  >
                    <Menu size={16} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{showAllLeadFinder ? 'Show Less' : 'Show All'}</span>
                  </button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Data Scraper */}
            <Collapsible open={dataScraperOpen} onOpenChange={setDataScraperOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#ff5f38] text-white transition-all duration-200 group">
                <span className="text-xs font-bold tracking-wide uppercase">Data Scraper</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${dataScraperOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-0.5 mt-1">
                  {dataScraperTools.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 px-3 py-2 ml-2 rounded-lg transition-all duration-200 group whitespace-nowrap overflow-hidden ${
                          isActive
                            ? 'bg-[#ff5f38] text-white shadow-sm'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <item.icon size={16} className="flex-shrink-0" />
                        <span className="text-sm font-medium truncate">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => setShowAllDataScraper(!showAllDataScraper)}
                    className="flex items-center space-x-2 px-3 py-2 ml-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 w-full group whitespace-nowrap"
                  >
                    <Menu size={16} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{showAllDataScraper ? 'Show Less' : 'Show All'}</span>
                  </button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>

          {/* Logout Button */}
          <div className="px-3 pb-4 border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 group"
            >
              <LogOut size={18} className="flex-shrink-0" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
