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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 flex flex-col bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 text-gray-900 shadow-2xl border-r border-gray-200">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-xl font-bold text-white">DL</span>
            </div>
            <span className="text-gray-900 font-bold text-xl tracking-tight">Daddy Leads</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* B2B Lead Finder */}
          <Collapsible open={leadFinderOpen} onOpenChange={setLeadFinderOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/60 transition-all duration-200 group">
              <span className="text-sm font-bold tracking-wide uppercase text-gray-900">B2B Lead Finder</span>
              <ChevronDown size={18} className={`transition-transform duration-200 text-gray-600 group-hover:text-gray-900 ${leadFinderOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1.5 mt-2">
                {leadFinderTools.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 ml-2 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-white/80 shadow-md'
                          : 'hover:bg-white/60 hover:translate-x-1'
                      }`}
                    >
                      <item.icon size={20} className="flex-shrink-0 text-gray-700" />
                      <span className="text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => setShowAllLeadFinder(!showAllLeadFinder)}
                  className="flex items-center space-x-3 px-4 py-3 ml-2 rounded-xl text-gray-700 hover:bg-white/60 hover:text-gray-900 transition-all duration-200 w-full group hover:translate-x-1"
                >
                  <Menu size={20} className="flex-shrink-0" />
                  <span className="text-base font-medium">{showAllLeadFinder ? 'Show Less' : 'Show All'}</span>
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Data Scraper */}
          <Collapsible open={dataScraperOpen} onOpenChange={setDataScraperOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/60 transition-all duration-200 group">
              <span className="text-sm font-bold tracking-wide uppercase text-gray-900">Data Scraper</span>
              <ChevronDown size={18} className={`transition-transform duration-200 text-gray-600 group-hover:text-gray-900 ${dataScraperOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1.5 mt-2">
                {dataScraperTools.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 ml-2 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-white/80 shadow-md'
                          : 'hover:bg-white/60 hover:translate-x-1'
                      }`}
                    >
                      <item.icon size={20} className="flex-shrink-0 text-gray-700" />
                      <span className="text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
                <button
                  onClick={() => setShowAllDataScraper(!showAllDataScraper)}
                  className="flex items-center space-x-3 px-4 py-3 ml-2 rounded-xl text-gray-700 hover:bg-white/60 hover:text-gray-900 transition-all duration-200 w-full group hover:translate-x-1"
                >
                  <Menu size={20} className="flex-shrink-0" />
                  <span className="text-base font-medium">{showAllDataScraper ? 'Show Less' : 'Show All'}</span>
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </nav>

        {/* Credits Section */}
        <div className="px-4 pb-6 space-y-3 border-t border-gray-200 pt-6">
          <div className="px-4 py-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-md">
            <div className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Your Credits</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Lead Finder</span>
                <span className="text-base font-bold text-orange-600 px-3 py-1 rounded-lg bg-orange-50">
                  {user?.credits?.leadsFinderCredits || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Data Scraper</span>
                <span className="text-base font-bold text-blue-600 px-3 py-1 rounded-lg bg-blue-50">
                  {user?.credits?.dataScraperCredits || 0}
                </span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => navigate('/dashboard/buy-credits')}
          >
            <CreditCard className="mr-2" size={18} />
            Buy Credits
          </Button>

          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            onClick={() => window.open('https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm', '_blank')}
          >
            <Download className="mr-2" size={18} />
            Cookie Exporter Extension
          </Button>

          {/* Account */}
          <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-white/60 transition-all duration-200 group">
              <div className="flex items-center space-x-3">
                <Settings size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                <span className="text-sm font-semibold text-gray-900">Account</span>
              </div>
              <ChevronDown size={18} className={`transition-transform duration-200 text-gray-600 group-hover:text-gray-900 ${accountOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 ml-2 rounded-xl text-gray-700 hover:bg-white/60 hover:text-gray-900 transition-all duration-200 group hover:translate-x-1"
                >
                  <LogOut size={20} className="flex-shrink-0" />
                  <span className="text-base font-medium">Logout</span>
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
