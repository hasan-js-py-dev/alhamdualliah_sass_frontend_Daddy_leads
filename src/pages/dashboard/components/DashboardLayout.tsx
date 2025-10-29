import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Database, 
  Mail, 
  CheckCircle, 
  ChevronDown,
  CreditCard,
  Settings,
  LogOut,
  Download,
  Menu
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
  const [accountOpen, setAccountOpen] = useState(false);
  const [showAllLeadFinder, setShowAllLeadFinder] = useState(false);
  const [showAllDataScraper, setShowAllDataScraper] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/access?p=login');
  };

  const allLeadFinderTools = [
    { name: 'LinkedIn Sales Nav Scraper', path: '/dashboard/linkedin-sales-nav-scraper', icon: Zap, isDefault: true },
    { name: 'Bulk LinkedIn Profile Enricher', path: '/dashboard/bulk-linkedin-profile-enricher', icon: Database, isDefault: true },
    { name: 'Apollo Scraper', path: '/dashboard/apollo-scraper', icon: Database, isDefault: true },
    { name: 'Email Enricher', path: '/dashboard/email-enricher', icon: Mail, isDefault: false },
    { name: 'Domain Enricher', path: '/dashboard/domain-enricher', icon: Database, isDefault: false },
    { name: 'Zoominfo Scraper', path: '/dashboard/zoominfo-scraper', icon: Database, isDefault: false },
    { name: 'Crunchbase Scraper', path: '/dashboard/crunchbase-scraper', icon: Database, isDefault: false },
    { name: 'Lemlist Scraper', path: '/dashboard/lemlist-scraper', icon: Mail, isDefault: false },
  ];

  const allDataScraperTools = [
    { name: 'Email Verifier', path: '/dashboard/email-verifier', icon: CheckCircle, isDefault: true },
    { name: 'LinkedIn Sales Nav Company Scraper', path: '/dashboard/linkedin-company-scraper', icon: Database, isDefault: true },
    { name: 'Google Map Scraper', path: '/dashboard/google-map-scraper', icon: Database, isDefault: true },
    { name: 'Yelp Scraper', path: '/dashboard/yelp-scraper', icon: Database, isDefault: false },
    { name: 'Restaurant Directories', path: '/dashboard/restaurant-directories', icon: Database, isDefault: false },
    { name: 'RealEstate Directories', path: '/dashboard/realestate-directories', icon: Database, isDefault: false },
    { name: 'Scrape Companies from B2B Databases', path: '/dashboard/b2b-databases', icon: Database, isDefault: false },
  ];

  const leadFinderTools = showAllLeadFinder 
    ? allLeadFinderTools 
    : allLeadFinderTools.filter(tool => tool.isDefault);

  const dataScraperTools = showAllDataScraper 
    ? allDataScraperTools 
    : allDataScraperTools.filter(tool => tool.isDefault);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-[#6b46c1] text-white">
        {/* Logo */}
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <span className="text-xl font-bold text-[#6b46c1]">DL</span>
            </div>
            <span className="text-white font-semibold text-lg">Daddy Leads</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
          {/* B2B Lead Finder */}
          <Collapsible open={leadFinderOpen} onOpenChange={setLeadFinderOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-sm font-semibold">B2B Lead Finder</span>
              <ChevronDown size={16} className={`transition-transform ${leadFinderOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1 mt-1">
                {leadFinderTools.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 ml-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => setShowAllLeadFinder(!showAllLeadFinder)}
                  className="flex items-center space-x-3 px-3 py-2 ml-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full"
                >
                  <Menu size={18} />
                  <span className="text-sm">{showAllLeadFinder ? 'Show Less' : 'Show All'}</span>
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Data Scraper */}
          <Collapsible open={dataScraperOpen} onOpenChange={setDataScraperOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-sm font-semibold">Data Scraper</span>
              <ChevronDown size={16} className={`transition-transform ${dataScraperOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1 mt-1">
                {dataScraperTools.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 ml-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon size={18} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => setShowAllDataScraper(!showAllDataScraper)}
                  className="flex items-center space-x-3 px-3 py-2 ml-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors w-full"
                >
                  <Menu size={18} />
                  <span className="text-sm">{showAllDataScraper ? 'Show Less' : 'Show All'}</span>
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </nav>

        {/* Credits Section */}
        <div className="px-3 pb-4 space-y-3 border-t border-white/10 pt-4">
          <div className="px-3 py-2 rounded-lg bg-white/5">
            <div className="text-xs text-white/70 mb-1">Credits</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lead Finder</span>
              <span className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded">
                {user?.credits?.leadsFinderCredits || 0}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium">Data Scraper</span>
              <span className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded">
                {user?.credits?.dataScraperCredits || 0}
              </span>
            </div>
          </div>

          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            onClick={() => navigate('/dashboard/buy-credits')}
          >
            Buy credits
          </Button>

          {/* Account */}
          <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-2">
                <Settings size={18} />
                <span className="text-sm font-medium">Account</span>
              </div>
              <ChevronDown size={16} className={`transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1 mt-1 ml-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
                <button
                  onClick={() => window.open('https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm', '_blank')}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Download size={18} />
                  <span className="text-sm">Get Extension</span>
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
