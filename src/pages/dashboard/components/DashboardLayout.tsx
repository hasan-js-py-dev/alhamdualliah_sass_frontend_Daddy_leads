import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Database, 
  Mail, 
  CheckCircle, 
  Users, 
  Key, 
  UserCircle, 
  CreditCard,
  LogOut
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement MongoDB logout
    localStorage.removeItem('authToken');
    navigate('/access?p=login');
  };

  const navigation = [
    { name: 'Sales Navigator Export', path: '/dashboard/sales-navigator', icon: Zap },
    { name: 'URL Enrichment', path: '/dashboard/url-enrichment', icon: Database },
    { name: 'Email Finder', path: '/dashboard/email-finder', icon: Mail },
    { name: 'Email Verifier', path: '/dashboard/email-verifier', icon: CheckCircle },
  ];

  const bottomNavigation = [
    { name: 'Credits', path: '/dashboard/credits', icon: CreditCard },
    { name: 'Team', path: '/dashboard/team', icon: Users },
    { name: 'API', path: '/dashboard/api', icon: Key },
    { name: 'Account', path: '/dashboard/account', icon: UserCircle },
  ];

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#f5f3ff' }}>
      {/* Sidebar */}
      <aside className="w-56 flex flex-col" style={{ backgroundColor: '#6366f1' }}>
        {/* Logo */}
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
              <span className="text-xl font-bold" style={{ color: '#6366f1' }}>DL</span>
            </div>
            <span className="text-white font-semibold text-lg">Daddy Leads</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 pb-6 space-y-1 border-t border-white/10 pt-4">
          {bottomNavigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
